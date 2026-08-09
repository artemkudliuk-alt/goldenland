import fs from "fs";
import path from "path";
import { put, list, del } from "@vercel/blob";
import { properties as staticProperties } from "./properties";

export interface PropertyData {
  id: string;
  slug: string;
  title: { en: string; ua: string; ru: string };
  location: { en: string; ua: string; ru: string };
  city: string;
  type: "apartments" | "villas" | "hotels" | "commercial";
  price: number;
  area: number;
  bedrooms?: number;
  roi?: string;
  gallery: string[];
  video?: string;
  status?: string;
  address?: { en: string; ua: string; ru: string } | string;
  managerName?: string;
  managerInitials?: string;
  managerPhoto?: string;
  managerWhatsapp?: string;
  managerTelegram?: string;
  description: { en: string; ua: string; ru: string };
  specs?: {
    rooms?: string;
    layout?: string;
    floor?: string;
    renovation?: string;
    newBuild?: string;
    construction?: string;
    heating?: string;
    ceilings?: string;
    yearBuilt?: string;
  };
}

function dataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp";
  }
  return process.env.LEADS_DATA_DIR || process.cwd();
}

function filePath(): string {
  return path.join(dataDir(), "custom_properties.json");
}

function getSeededProperties(): PropertyData[] {
  return staticProperties.map((p) => {
    const bedrooms = p.beds || 0;
    
    let roomsText = `${bedrooms || 3} Rooms`;
    let layoutText = `${p.area} / ${Math.round(p.area * 0.6)} / 20 m²`;
    let floorText = p.type === "villas" ? "2 Floors" : "Floor 5 of 12";
    let renovationText = "Designer premium finish";
    let newBuildText = p.status === "off-plan" ? "Off-Plan Project" : "Ready Property";
    let constructionText = "Monolithic Frame";
    let heatingText = "Autonomous heating";
    let ceilingsText = "3.1 m ceiling height";
    let yearBuiltText = "Built in 2022";

    let addressVal = p.location?.en || (p.city === "dubai" ? "Dubai, UAE" : "Odesa, Ukraine");

    return {
      id: "seed_" + p.slug,
      slug: p.slug,
      title: { en: p.title.en, ua: p.title.ua, ru: p.title.ru },
      location: { en: p.location.en, ua: p.location.ua, ru: p.location.ru },
      city: p.city,
      type: p.type,
      price: p.price,
      area: p.area,
      bedrooms: bedrooms,
      roi: p.roi ? String(p.roi) : "",
      gallery: p.gallery,
      video: "",
      status: p.status,
      address: addressVal,
      description: { en: p.description.en, ua: p.description.ua, ru: p.description.ru },
      specs: {
        rooms: roomsText,
        layout: layoutText,
        floor: floorText,
        renovation: renovationText,
        newBuild: newBuildText,
        construction: constructionText,
        heating: heatingText,
        ceilings: ceilingsText,
        yearBuilt: yearBuiltText
      }
    };
  });
}

function normalizeKey(str?: string): string {
  if (!str) return "";
  return str.toLowerCase().trim().replace(/[^a-z0-9\u0400-\u04FF]/g, "");
}

function deduplicateStoredProperties(stored: PropertyData[]): PropertyData[] {
  const seeded = getSeededProperties();
  const seededMapBySlug = new Map(seeded.map((s) => [s.slug, s]));
  const result: PropertyData[] = [];
  const seenKeys = new Set<string>();

  const getKeys = (p: PropertyData): string[] => {
    const keys: string[] = [];
    if (p.slug) keys.push(`slug:${p.slug.toLowerCase().trim()}`);
    if (p.id && !p.id.startsWith("prop_")) keys.push(`id:${p.id.toLowerCase().trim()}`);
    if (p.title?.en) keys.push(`title_en:${normalizeKey(p.title.en)}`);
    if (p.title?.ua) keys.push(`title_ua:${normalizeKey(p.title.ua)}`);
    if (p.title?.ru) keys.push(`title_ru:${normalizeKey(p.title.ru)}`);
    return keys;
  };

  for (const item of stored) {
    const keys = getKeys(item);
    const alreadySeen = keys.some((k) => seenKeys.has(k));
    if (alreadySeen) {
      continue;
    }

    const seedDefault = seededMapBySlug.get(item.slug);
    const enrichedItem: PropertyData = {
      ...(seedDefault || {}),
      ...item,
      id: item.id || seedDefault?.id || `prop_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      slug: item.slug || seedDefault?.slug || "",
      title: item.title || seedDefault?.title || { en: "", ua: "", ru: "" },
      location: item.location || seedDefault?.location || { en: "", ua: "", ru: "" },
      description: item.description || seedDefault?.description || { en: "", ua: "", ru: "" },
      address: item.address || seedDefault?.address || "",
      specs: item.specs || seedDefault?.specs,
      gallery: item.gallery && item.gallery.length > 0 ? item.gallery : (seedDefault?.gallery || []),
    };

    result.push(enrichedItem);
    keys.forEach((k) => seenKeys.add(k));
  }

  return result;
}

export async function getCustomProperties(): Promise<PropertyData[]> {
  let propertiesList: PropertyData[] = [];
  let loaded = false;

  // 1. Try Vercel Blob Storage FIRST (Primary Store)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "data/custom_properties" });
      if (blobs.length > 0) {
        const sorted = [...blobs].sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        // Add cache-busting param to bypass Vercel Blob CDN cache
        const blobUrl = `${sorted[0].url}?t=${Date.now()}`;
        const blobRes = await fetch(blobUrl, { cache: "no-store" });
        if (blobRes.ok) {
          const parsed = await blobRes.json();
          if (Array.isArray(parsed) && parsed.length > 0) {
            propertiesList = parsed as PropertyData[];
            loaded = true;
          }
        }
      }
    } catch (err) {
      console.error("[properties-store] Blob read failed:", err);
    }
  }

  // 2. Try Vercel KV if Blob was not loaded
  if (!loaded) {
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
          body: JSON.stringify(["GET", "custom_properties"]),
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          const raw = data?.result;
          if (raw) {
            let parsed: any = raw;
            if (typeof raw === "string") {
              try {
                parsed = JSON.parse(raw);
              } catch (e) {
                console.error("[properties-store] JSON parse error:", e);
              }
            }
            if (Array.isArray(parsed) && parsed.length > 0) {
              propertiesList = parsed as PropertyData[];
              loaded = true;
            }
          }
        }
      } catch (err) {
        console.error("[properties-store] KV read failed:", err);
      }
    }
  }

  // 3. Local file fallback
  if (!loaded) {
    const fp = filePath();
    try {
      if (fs.existsSync(fp)) {
        const raw = fs.readFileSync(fp, "utf-8");
        const parsed = JSON.parse(raw || "[]");
        if (Array.isArray(parsed) && parsed.length > 0) {
          propertiesList = parsed as PropertyData[];
          loaded = true;
        }
      }
    } catch (err) {
      console.error("[properties-store] local read failed:", err);
    }
  }

  if (loaded && propertiesList.length > 0) {
    return deduplicateStoredProperties(propertiesList);
  }

  // No stored data at all — return seeded defaults
  return getSeededProperties();
}

export async function saveCustomProperties(properties: PropertyData[]): Promise<boolean> {
  let saved = false;

  // 1. Save to Vercel Blob Storage FIRST
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      // Find old blobs and delete them to keep storage clean
      const { blobs } = await list({ prefix: "data/custom_properties" });
      if (blobs.length > 0) {
        const urlsToDelete = blobs.map((b) => b.url);
        await del(urlsToDelete);
      }

      await put("data/custom_properties.json", JSON.stringify(properties, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: true,
      });
      saved = true;
    } catch (err) {
      console.error("[properties-store] Blob write failed:", err);
    }
  }

  // 2. Save to Vercel KV
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
        body: JSON.stringify(["SET", "custom_properties", JSON.stringify(properties)]),
      });
      if (res.ok) {
        saved = true;
      }
    } catch (err) {
      console.error("[properties-store] KV write failed:", err);
    }
  }

  // 3. Local file fallback
  const fp = filePath();
  try {
    fs.writeFileSync(fp, JSON.stringify(properties, null, 2), "utf-8");
    saved = true;
  } catch (err) {
    console.error("[properties-store] local write failed:", err);
  }

  return saved;
}
