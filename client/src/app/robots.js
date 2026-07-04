export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: "https://dcasathepub.com/sitemap.xml",

    host: "https://dcasathepub.com",
  };
}