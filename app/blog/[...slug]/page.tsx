import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-component";
import { notFound } from "next/navigation";

import "@/public/styles/mdx.css";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { Tag } from "@/components/tag";
import ReportView from "./view";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
export const revalidate = 0;

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  const views = await redis.mget<number[]>(
    ["pageviews", "posts", post.slug].join(":")
  );

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <ReportView slug={post.slug} />
      <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="mt-0 prose prose-neutral dark:prose-invert ">
          {post.description}
        </p>
      ) : null}
      <div className="flex items-center space-x-4">{views} views</div>
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
