import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
export const revalidate = 0;

interface TagPageProps {
  params: {
    tag: string;
  };
}


export async function getPostViews(
  displayPosts: { slug: string }[]
): Promise<Record<string, number>> {
  const views = (
    await redis.mget<number[]>(
      ...displayPosts.map((p) => ["pageviews", "posts", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[displayPosts[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return views;
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const displayPosts = getPostsByTagSlug(posts, tag);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  const views = (
    await redis.mget<number[]>(
      ...displayPosts.map((p) => ["pageviews", "posts", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[displayPosts[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-2xl font-helvetica capitalize">
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                      views={views}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
