import fs from "fs";
import path from "path";
import crypto from "crypto";
import { put, list } from "@vercel/blob";

export type LeadStatus = "new" | "in_progress" | "completed" | "declined";

export const LEAD_STATUSES: LeadStatus[] = ["new", "in_progress", "completed", "declined"];

export interface StoredLead {
  id: string;
  formType: string;
  name?: string;
  phone?: string;
  email?: string;
  interest?: string;
  message?: string;
  format?: string;
  propertyTitle?: string;
  propertyId?: string;
  lang?: string;
  status: LeadStatus;
  notes?: string;
  timestamp: string;
}

function dataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp";
  }
  return process.env.LEADS_DATA_DIR || process.cwd();
}

function filePath(): string {
  return path.join(dataDir(), "leads_captured.json");
}

async function readAll(): Promise<StoredLead[]> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let loaded = false;
  let result: StoredLead[] = [];

  // 1. Try Vercel KV
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "leads"]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const raw = data?.result;
        if (raw) {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (Array.isArray(parsed)) {
            result = parsed.map((l: any) => ({
              ...l,
              id: l.id || crypto.randomUUID(),
              status: l.status || "new",
              timestamp: l.timestamp || new Date().toISOString(),
            })) as StoredLead[];
            loaded = true;
          }
        }
      }
    } catch (err) {
      console.error("[leads-store] KV read failed:", err);
    }
  }

  // 2. Try Vercel Blob Storage
  if (!loaded && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "data/leads_captured.json" });
      if (blobs.length > 0) {
        const sorted = [...blobs].sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        const blobUrl = `${sorted[0].url}?t=${Date.now()}`;
        const blobRes = await fetch(blobUrl, { cache: "no-store" });
        if (blobRes.ok) {
          const parsed = await blobRes.json();
          if (Array.isArray(parsed)) {
            result = parsed.map((l: any) => ({
              ...l,
              id: l.id || crypto.randomUUID(),
              status: l.status || "new",
              timestamp: l.timestamp || new Date().toISOString(),
            })) as StoredLead[];
            loaded = true;
          }
        }
      }
    } catch (err) {
      console.error("[leads-store] Blob read failed:", err);
    }
  }

  // 3. Local file fallback
  if (!loaded) {
    const fp = filePath();
    try {
      if (fs.existsSync(fp)) {
        const raw = fs.readFileSync(fp, "utf-8");
        const parsed = JSON.parse(raw || "[]");
        if (Array.isArray(parsed)) {
          result = parsed.map((l: any) => ({
            ...l,
            id: l.id || crypto.randomUUID(),
            status: l.status || "new",
            timestamp: l.timestamp || new Date().toISOString(),
          })) as StoredLead[];
        }
      }
    } catch (err) {
      console.error("[leads-store] local read failed:", err);
    }
  }

  return result;
}

async function writeAll(leads: StoredLead[]): Promise<boolean> {
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
        body: JSON.stringify(["SET", "leads", JSON.stringify(leads)]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.result === "OK") saved = true;
      }
    } catch (err) {
      console.error("[leads-store] KV write failed:", err);
    }
  }

  // 2. Save to Vercel Blob Storage
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("data/leads_captured.json", JSON.stringify(leads, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      saved = true;
    } catch (err) {
      console.error("[leads-store] Blob write failed:", err);
    }
  }

  // 3. Local file fallback
  const fp = filePath();
  const tmp = `${fp}.${process.pid}.tmp`;
  try {
    fs.mkdirSync(path.dirname(fp), { recursive: true });
    fs.writeFileSync(tmp, JSON.stringify(leads, null, 2), "utf-8");
    fs.renameSync(tmp, fp);
    saved = true;
  } catch (err) {
    console.error("[leads-store] local write failed:", err);
    try {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    } catch {}
  }

  return saved;
}

export type NewLead = Omit<StoredLead, "id" | "status" | "timestamp"> &
  Partial<Pick<StoredLead, "status" | "timestamp">>;

export async function appendLead(lead: NewLead): Promise<{ record: StoredLead; persisted: boolean }> {
  const record: StoredLead = {
    ...lead,
    id: crypto.randomUUID(),
    status: lead.status || "new",
    timestamp: lead.timestamp || new Date().toISOString(),
  };
  const leads = await readAll();
  leads.push(record);
  const persisted = await writeAll(leads);
  return { record, persisted };
}

export async function getLeads(): Promise<StoredLead[]> {
  const leads = await readAll();
  return leads.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
  if (!LEAD_STATUSES.includes(status)) return false;
  const leads = await readAll();
  const target = leads.find((l) => l.id === id);
  if (!target) return false;
  target.status = status;
  return await writeAll(leads);
}

export async function updateLead(id: string, updates: Partial<StoredLead>): Promise<boolean> {
  const leads = await readAll();
  const targetIndex = leads.findIndex((l) => l.id === id);
  if (targetIndex === -1) return false;
  
  const { id: _, timestamp: __, ...validUpdates } = updates;
  leads[targetIndex] = { ...leads[targetIndex], ...validUpdates };
  return await writeAll(leads);
}

export async function deleteLead(id: string): Promise<boolean> {
  const leads = await readAll();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  return await writeAll(filtered);
}

export async function deleteLeads(ids: string[]): Promise<boolean> {
  const idSet = new Set(ids);
  const leads = await readAll();
  const filtered = leads.filter((l) => !idSet.has(l.id));
  return await writeAll(filtered);
}
