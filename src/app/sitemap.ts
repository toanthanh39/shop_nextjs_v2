import { MetadataRoute } from "next";
const domain = process.env.NEXT_PUBLIC_API_BASE_DOMAIN!;
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: domain,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: domain + "/collection",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: domain + "/products",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: domain + "/blogs",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.4,
		},
	];
}
