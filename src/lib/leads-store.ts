import fs from "fs";
import path from "path";
import crypto from "crypto";

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
      if (!res.ok) {
        throw new Error(`KV API error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const raw = data?.result;
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((l: any) => ({
        ...l,
        id: l.id || crypto.randomUUID(),
        status: l.status || "new",
        timestamp: l.timestamp || new Date().toISOString(),
      })) as StoredLead[];
    } catch (err) {
      console.error("[leads-store] KV read failed, falling back to local file:", err);
    }
  }

  // Local file fallback
  const fp = filePath();
  try {
    if (!fs.existsSync(fp)) return [];
    const raw = fs.readFileSync(fp, "utf-8");
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((l: any) => ({
      ...l,
      id: l.id || crypto.randomUUID(),
      status: l.status || "new",
      timestamp: l.timestamp || new Date().toISOString(),
    })) as StoredLead[];
  } catch (err) {
    console.error("[leads-store] local read failed:", err);
    return [];
  }
}

async function writeAll(leads: StoredLead[]): Promise<boolean> {
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
        body: JSON.stringify(["SET", "leads", JSON.stringify(leads)]),
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`KV API error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      return data?.result === "OK";
    } catch (err) {
      console.error("[leads-store] KV write failed, falling back to local file:", err);
    }
  }

  // Local file fallback
  const fp = filePath();
  const tmp = `${fp}.${process.pid}.tmp`;
  try {
    fs.mkdirSync(path.dirname(fp), { recursive: true });
    fs.writeFileSync(tmp, JSON.stringify(leads, null, 2), "utf-8");
    fs.renameSync(tmp, fp);
    return true;
  } catch (err) {
    console.error("[leads-store] local write failed:", err);
    try {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    } catch {}
    return false;
  }
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
