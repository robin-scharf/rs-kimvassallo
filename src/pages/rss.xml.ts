import rss from "@astrojs/rss";
import { getCollection, getEntry } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const settings = (await getEntry("settings", "site"))!.data;
  const posts = (await getCollection("blog", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: `${settings.siteName} — Blog`,
    description: settings.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.publishedAt,
      description: p.data.summary,
      link: `/blog/${p.id}/`,
    })),
  });
}
