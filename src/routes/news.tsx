import { createFileRoute } from "@tanstack/react-router";
import { news } from "@/data/sports";
import { FeaturedNews, NewsCard } from "@/components/news-card";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Sports News & Highlights — VelocitySports" },
      {
        name: "description",
        content:
          "Transfer news, tactical analysis and match highlights from football and basketball.",
      },
      { property: "og:title", content: "Sports News & Highlights — VelocitySports" },
      {
        property: "og:description",
        content: "Transfer news, tactical analysis and highlights.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const featured = news.find((n) => n.featured)!;
  const rest = news.filter((n) => !n.featured);

  return (
    <PageShell
      eyebrow="Newsroom"
      title="News & Highlights"
      description="Long reads, transfer updates and post-match analysis."
    >
      <div className="space-y-8">
        <FeaturedNews item={featured} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
