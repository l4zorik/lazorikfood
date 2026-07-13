"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
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

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  let inBlockquote = false;

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("> ")) {
      if (!inBlockquote) {
        inBlockquote = true;
        elements.push(
          <blockquote key={i} className="my-6 border-l-4 border-brand-400 bg-brand-50/50 pl-4 italic text-stone-700">
            {trimmed.slice(2)}
          </blockquote>,
        );
      }
      return;
    }
    if (inBlockquote) inBlockquote = false;

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listItems.push(
        <li key={i} className="ml-5 list-disc text-stone-700 last:mb-0">
          {trimmed.slice(2)}
        </li>,
      );
      return;
    }
    if (inList) {
      elements.push(<ul key={`ul-${i}`} className="my-4 space-y-1">{listItems}</ul>);
      listItems = [];
      inList = false;
    }

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mb-2 mt-8 text-xl font-bold text-stone-900">
          {trimmed.slice(4)}
        </h3>,
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mb-3 mt-10 text-2xl font-bold text-stone-900">
          {trimmed.slice(3)}
        </h2>,
      );
    } else if (trimmed.startsWith("1. ")) {
      elements.push(
        <li key={i} className="ml-5 list-decimal text-stone-700">
          {trimmed.slice(3)}
        </li>,
      );
    } else if (trimmed === "") {
      if (trimmed === "" && i > 0) {
        elements.push(<div key={i} className="h-2" />);
      }
    } else {
      elements.push(
        <p key={i} className="my-2 leading-relaxed text-stone-700">
          {trimmed}
        </p>,
      );
    }
  });

  if (inList) {
    elements.push(<ul key="ul-end" className="my-4 space-y-1">{listItems}</ul>);
  }

  return elements;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Zpět na blog
      </Link>

      <article>
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 text-7xl">{post.image}</span>

          <div className="mb-3 flex items-center gap-3 text-xs">
            <span
              className={cn(
                "rounded-lg px-2.5 py-0.5 font-semibold",
                categoryColors[post.category] ?? "bg-stone-100 text-stone-600",
              )}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-stone-400">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-stone-400">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <span className="text-stone-300">{post.date}</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            {post.title}
          </h1>

          <p className="mt-3 max-w-xl text-stone-500">{post.description}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="prose-custom">{renderContent(post.content)}</div>
      </article>

      <div className="mt-12 border-t border-stone-200 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Zpět na všechny články
        </Link>
      </div>
    </div>
  );
}
