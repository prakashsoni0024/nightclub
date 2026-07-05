import { BUSINESS } from "@/lib/business";
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: `${BUSINESS.domain}/sitemap.xml`,

    host: BUSINESS.domain,
  };
}