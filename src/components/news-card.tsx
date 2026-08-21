import type { NewsItem } from "@/data/sports";

export function FeaturedNews({ item }: { item: NewsItem }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl">
      <img
        src={item.image}
        alt={item.title}
        width={1280}
        height={800}
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-background via-background/40 to-transparent p-5 sm:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded bg-primary px-2 py-0.5 font-display text-[10px] font-extrabold uppercase italic tracking-tight text-primary-foreground">
            {item.category}
          </span>
          <span className="text-[10px] font-bold uppercase text-muted-foreground">
            {item.readTime}
          </span>
        </div>
        <h2 className="mb-3 font-display text-2xl font-extrabold tracking-tight transition-colors group-hover:text-primary sm:text-4xl">
          {item.title}
        </h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
      </div>
    </article>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group space-y-4 rounded-2xl border border-border bg-card p-4">
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        width={1024}
        height={640}
        className="aspect-video w-full rounded-xl object-cover"
      />
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
          {item.category}
        </span>
        <h3 className="mt-1 font-bold leading-tight underline-offset-4 group-hover:underline">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{item.excerpt}</p>
      </div>
    </article>
  );
}
