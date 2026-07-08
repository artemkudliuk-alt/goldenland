import fs from "fs";
import path from "path";
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
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            return {
              whatsapp: parsed.whatsapp || DEFAULT_CONTACT_SETTINGS.whatsapp,
              telegram: parsed.telegram || DEFAULT_CONTACT_SETTINGS.telegram,
              offices: Array.isArray(parsed.offices) ? parsed.offices : DEFAULT_CONTACT_SETTINGS.offices,
            };
          }
        }
      }
    } catch (err) {
      console.error("[contacts-store] KV settings read failed, falling back to local file:", err);
    }
  }

  // Local file fallback
  const fp = filePath();
  try {
    if (fs.existsSync(fp)) {
      const raw = fs.readFileSync(fp, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          whatsapp: parsed.whatsapp || DEFAULT_CONTACT_SETTINGS.whatsapp,
          telegram: parsed.telegram || DEFAULT_CONTACT_SETTINGS.telegram,
          offices: Array.isArray(parsed.offices) ? parsed.offices : DEFAULT_CONTACT_SETTINGS.offices,
        };
      }
    }
  } catch (err) {
    console.error("[contacts-store] local settings read failed:", err);
  }

  return DEFAULT_CONTACT_SETTINGS;
}

export async function saveContactSettings(settings: ContactSettings): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

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
        return true;
      }
    } catch (err) {
      console.error("[contacts-store] KV settings write failed, saving locally:", err);
    }
  }

  // Local file fallback
  const fp = filePath();
  try {
    fs.writeFileSync(fp, JSON.stringify(settings, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[contacts-store] local settings write failed:", err);
    return false;
  }
}
