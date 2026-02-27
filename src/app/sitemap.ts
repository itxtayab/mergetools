import { MetadataRoute } from "next";
import { CATEGORIES, toolsData, ToolCategory } from "@/lib/tools-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://tools.mergemain.com";

    // Static routes
    const staticRoutes = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : 0.5,
    }));

    // Categories routes
    const categoryRoutes = Object.keys(CATEGORIES).map((category) => ({
        url: `${baseUrl}/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Tool routes
    const toolRoutes = toolsData.map((tool) => ({
        url: `${baseUrl}/${tool.category}/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}
