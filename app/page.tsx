import Link from "next/link";
import { posts } from "#site/content";
import { cn, sortPosts } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { PostItem } from "@/components/post-item";
import Image from "next/image";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
export const revalidate = 0;

export default async function Home() {
  const latestPosts = sortPosts(posts).slice(0, 2);

  const views = (
    await redis.mget<number[]>(
      ...latestPosts.map((p) => ["pageviews", "posts", p.slug].join(":"))
    )
  ).reduce((acc, v, i) => {
    acc[latestPosts[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 mb:mt-10 lg:pt-12 ">
        <div className="container flex flex-col gap-4">
          <h1 className=" sm:text-2xl font-black text-balance font-helvetica ">
            hey 🐲, i&apos;m Peter Shaan
          </h1>
          <p className=" mx-auto text-muted-foreground text-balance text-gray-100 ">
            21 years old from 🇮🇩,🖥️ Student of Informatic Technology, and also
            Content Creator and Video Editor
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="mailto:contactpetershaan@gmail.com"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full h-10 sm:w-fit bg-green-400 hover:bg-green-800 hover:text-white text-black"
              )}
            >
              Email Me
            </Link>
            <Link
              href="/projects"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-fit hover:bg-green-300/10 dark:border-green-200 dark:text-green-100 hover:text-green-100"
              )}
            >
              See My Projects
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-3 px-5 gap-2">
        <div className="row-span-2">
          <Image
            src="/me/1.png"
            alt="me1.png"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={200}
          />
        </div>
        <div>
          <Image
            src="/me/2.png"
            alt="me1.png"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
        <div className="relative">
          <Image
            src="/me/4.jpg"
            alt="me1.png"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
        <div>
          <Image
            src="/me/3.png"
            alt="me1.png"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>

        <div>
          <Image
            src="/me/5.png"
            alt="me1.png"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-2xl font-black text-center font-helvetica">
          Experience
        </h2>
        <hr className="my-2" />
        <div className="prose prose-zinc dark:prose-invert max-w-full w-full">
          <p className="dark:text-gray-400 ">August 2023 - Present</p>
          <h1 className="text-xl my-2">
            <span className="font-helvetica">Programmer at</span>
            <a
              href="https://unai.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline px-2"
            >
              Universitas Advent Indonesia
            </a>
          </h1>

          <p className="dark:text-gray-400 ">
            Create & Develop Website{" "}
            <a
              href="https://unai.edu"
              className="underline font-medium text-black dark:text-gray-400 "
            >
              unai.edu
            </a>{" "}
            <span>& </span>
            <a
              href="https://news.unai.edu"
              className="underline font-medium text-black dark:text-gray-400 "
            >
              news.unai.edu
            </a>{" "}
            (NEW 2024) <br /> Development & Database Administrator Module UNAI
            (Universitas Advent Indonesia)
          </p>
          <Image
            src="/projects/unaiRevamp.png"
            width={900}
            height={500}
            className="rounded-lg"
            alt="unai_revamp"
          />

          <a>unai.edu</a>

          <h3 id="stack-used" data-svelte-h="svelte-ghvkof">
            Stack used
          </h3>
          <ul>
            <li>php</li>
            <li>Bootstrap</li>
            <li>mysql</li>
          </ul>
        </div>
      </section>
      <section className="container max-w-4xl pb-6 flex flex-col">
        <h2 className="text-2xl font-black text-center font-helvetica pb-5">
          Latest Posts
        </h2>
        <ul className="flex flex-col ">
          {latestPosts.map((post) => (
            <li key={post.slug} className="first:border-t first:border-border">
              <PostItem
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                views={views}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
