"use client";

import Link from "next/link";
import { Clock, User, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "Česká kuchyně": "bg-amber-100 text-amber-700",
  "Asijská kuchyně": "bg-red-100 text-red-700",
  "Italská kuchyně": "bg-green-100 text-green-700",
  Grilování: "bg-orange-100 text-orange-700",
  Polévky: "bg-blue-100 text-blue-700",
  Dezerty: "bg-pink-100 text-pink-700",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Food blog
        </h1>
        <p className="mt-2 text-stone-500">
          Recepty, tipy a triky z české i světové kuchyně
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 text-6xl">
              {post.image}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-lg px-2.5 py-0.5 text-xs font-semibold",
                    categoryColors[post.category] ?? "bg-stone-100 text-stone-600",
                  )}
                >
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-stone-400">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold leading-snug text-stone-900 transition-colors group-hover:text-brand-600">
                {post.title}
              </h2>

              <p className="flex-1 text-sm leading-relaxed text-stone-500">
                {post.description}
              </p>

              <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1 font-medium text-brand-600 transition-colors group-hover:text-brand-700">
                  Číst více
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
