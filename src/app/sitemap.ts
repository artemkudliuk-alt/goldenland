import { MetadataRoute } from "next";
import { getCustomProperties } from "@/lib/properties-store";
import { getCustomPages } from "@/lib/pages-store";
import { posts } from "@/lib/posts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://goldenlandproperty.com.ua";

  const staticPages = [
    "",
    "/catalog",
    "/services",
    "/about",
    "/contacts",
    "/insights",
    "/presentation",
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic property pages
  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const properties = await getCustomProperties();
    propertyRoutes = properties.map((prop) => ({
      url: `${baseUrl}/properties/${prop.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: failed to load properties", e);
  }

  // Dynamic blog insights / posts
  const insightRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/insights/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Dynamic custom admin pages
  let customPageRoutes: MetadataRoute.Sitemap = [];
  try {
    const pages = await getCustomPages();
    customPageRoutes = pages
      .filter((page) => page.slug && page.slug !== "contacts")
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
  } catch (e) {
    console.error("Sitemap: failed to load custom pages", e);
  }

  return [...staticRoutes, ...propertyRoutes, ...insightRoutes, ...customPageRoutes];
}
