import fs from "fs";
import path from "path";
import { put, list } from "@vercel/blob";
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

    if (p.slug === "kyiv-pechersk-penthouse") {
      roomsText = "4 Rooms";
      layoutText = "320 / 180 / 35 м²";
      floorText = "Floor 24 of 25";
      renovationText = "Luxury designer finish";
      newBuildText = "New premium build";
      constructionText = "Monolithic Frame";
      heatingText = "Autonomous building boiler";
      ceilingsText = "3.4 m ceiling height";
      yearBuiltText = "Built in 2021";
    } else if (p.slug === "kyiv-podil-loft") {
      roomsText = "2 Rooms";
      layoutText = "120 / 72 / 20 м²";
      floorText = "Floor 3 of 5";
      renovationText = "Loft designer finish";
      newBuildText = "Heritage Restored";
      constructionText = "Brick & Monolith";
      heatingText = "Autonomous gas boiler";
      ceilingsText = "3.8 m ceiling height";
      yearBuiltText = "Built in 2018";
    } else if (p.slug === "odesa-arkadia-apartment") {
      roomsText = "3 Rooms";
      layoutText = "145 / 80 / 28 м²";
      floorText = "Floor 12 of 18";
      renovationText = "Turnkey premium finish";
      newBuildText = "New building";
      constructionText = "Monolithic Frame";
      heatingText = "Autonomous building boiler";
      ceilingsText = "3.1 m ceiling height";
      yearBuiltText = "Built in 2022";
    }

    let addressVal = "Kyiv, Ukraine";
    if (p.slug === "kyiv-pechersk-penthouse") addressVal = "Lomakivska St, 56/2, Pechersk, Kyiv";
    else if (p.slug === "kyiv-podil-loft") addressVal = "Yaroslavska St, 15, Podil, Kyiv";
    else if (p.slug === "odesa-arkadia-apartment") addressVal = "Genoese St, 24A, Arcadia, Odesa";
    else if (p.slug === "lviv-historic-townhouse") addressVal = "Staroyevreiska St, 10, Lviv";
    else if (p.slug === "kozyn-forest-villa") addressVal = "Kozyn, Kyiv Oblast, Ukraine";
    else if (p.slug === "odesa-beachfront-villa") addressVal = "Fontanska Rd, 120, Odesa";
    else if (p.slug === "lviv-rynok-boutique") addressVal = "Rynok Square, 5, Lviv";
    else if (p.slug === "odesa-black-sea-hotel") addressVal = "Primorskiy Blvd, 11, Odesa";
    else if (p.slug === "kyiv-hospitality-project") addressVal = "Khreschatyk St, 2, Kyiv";
    else if (p.slug === "kyiv-business-tower") addressVal = "Lesi Ukrainky Blvd, 26, Pechersk, Kyiv";
    else if (p.slug === "lviv-office-building") addressVal = "Naukova St, 7, Lviv";

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
      video: p.slug === "kyiv-pechersk-penthouse" ? "/videos/tour.mp4" : "",
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

export async function getCustomProperties(): Promise<PropertyData[]> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let propertiesList: PropertyData[] = [];
  let loaded = false;

  // 1. Try Vercel KV
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

  // 2. Try Vercel Blob Storage
  if (!loaded && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: "data/custom_properties.json" });
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
    // Merge: start with seeded properties as base, override with Blob data by slug,
    // then append any Blob items that are not in seeds (newly created in admin)
    const seeded = getSeededProperties();
    const blobMap = new Map(propertiesList.map((p) => [p.slug, p]));
    const seededMap = new Map(seeded.map((p) => [p.slug, p]));

    const merged: PropertyData[] = [];

    // Start with seeded properties, potentially overridden by Blob data
    for (const s of seeded) {
      if (blobMap.has(s.slug)) {
        merged.push(blobMap.get(s.slug)!);
      } else {
        merged.push(s);
      }
    }

    // Append custom properties from Blob that are NOT in seeded list
    for (const b of propertiesList) {
      if (!seededMap.has(b.slug)) {
        merged.push(b);
      }
    }

    return merged;
  }

  // No Blob data at all — return seeded defaults
  return getSeededProperties();
}

export async function saveCustomProperties(properties: PropertyData[]): Promise<boolean> {
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
        body: JSON.stringify(["SET", "custom_properties", JSON.stringify(properties)]),
      });
      if (res.ok) {
        saved = true;
      }
    } catch (err) {
      console.error("[properties-store] KV write failed:", err);
    }
  }

  // 2. Save to Vercel Blob Storage
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put("data/custom_properties.json", JSON.stringify(properties, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      saved = true;
    } catch (err) {
      console.error("[properties-store] Blob write failed:", err);
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
