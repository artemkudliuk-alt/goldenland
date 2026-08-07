import fs from "fs";
import path from "path";
import { put, list } from "@vercel/blob";
import { type OfficeData, type ContactSettings, DEFAULT_CONTACT_SETTINGS } from "./contacts-types";

export { type OfficeData, type ContactSettings, DEFAULT_CONTACT_SETTINGS };

function dataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp";
  }
  return process.env.LEADS_DATA_DIR || process.cwd();
}

function filePath(): string {
  return path.join(dataDir(), "contacts_settings.json");
}

export async function getContactSettings(): Promise<ContactSettings> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let settingsResult: ContactSettings | null = null;

  // 1. Try Vercel KV
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "contacts_settings"]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const raw = data?.result;
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (parsed && typeof parsed === "object") {
            settingsResult = {
              whatsapp: parsed.whatsapp || DEFAULT_CONTACT_SETTINGS.whatsapp,
              telegram: parsed.telegram || DEFAULT_CONTACT_SETTINGS.telegram,
              offices: Array.isArray(parsed.offices) ? parsed.offices : DEFAULT_CONTACT_SETTINGS.offices,
            };
          }
        }
      }
    } catch (err) {
      console.error("[contacts-store] KV settings read failed:", err);
    }
  }

  // 2. Try Vercel Blob Storage
  if (!settingsResult && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "data/contacts_settings.json" });
      if (blobs.length > 0) {
        const blobRes = await fetch(blobs[0].url, { cache: "no-store" });
        if (blobRes.ok) {
          const parsed = await blobRes.json();
          if (parsed && typeof parsed === "object") {
            settingsResult = {
              whatsapp: parsed.whatsapp || DEFAULT_CONTACT_SETTINGS.whatsapp,
              telegram: parsed.telegram || DEFAULT_CONTACT_SETTINGS.telegram,
              offices: Array.isArray(parsed.offices) ? parsed.offices : DEFAULT_CONTACT_SETTINGS.offices,
            };
          }
        }
      }
    } catch (err) {
      console.error("[contacts-store] Blob settings read failed:", err);
    }
  }

  // 3. Local file fallback
  if (!settingsResult) {
    const fp = filePath();
    try {
      if (fs.existsSync(fp)) {
        const raw = fs.readFileSync(fp, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          settingsResult = {
            whatsapp: parsed.whatsapp || DEFAULT_CONTACT_SETTINGS.whatsapp,
            telegram: parsed.telegram || DEFAULT_CONTACT_SETTINGS.telegram,
            offices: Array.isArray(parsed.offices) ? parsed.offices : DEFAULT_CONTACT_SETTINGS.offices,
          };
        }
      }
    } catch (err) {
      console.error("[contacts-store] local settings read failed:", err);
    }
  }

  return settingsResult || DEFAULT_CONTACT_SETTINGS;
}

export async function saveContactSettings(settings: ContactSettings): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let saved = false;

  // 1. Save to Vercel KV
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", "contacts_settings", JSON.stringify(settings)]),
      });
      if (res.ok) {
        saved = true;
      }
    } catch (err) {
      console.error("[contacts-store] KV settings write failed:", err);
    }
  }

  // 2. Save to Vercel Blob Storage
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("data/contacts_settings.json", JSON.stringify(settings, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
      });
      saved = true;
    } catch (err) {
      console.error("[contacts-store] Blob settings write failed:", err);
    }
  }

  // 3. Local file fallback
  const fp = filePath();
  try {
    fs.writeFileSync(fp, JSON.stringify(settings, null, 2), "utf-8");
    saved = true;
  } catch (err) {
    console.error("[contacts-store] local settings write failed:", err);
  }

  return saved;
}
