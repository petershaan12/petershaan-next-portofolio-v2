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
          <h1 className=" sm:text-2xl font-bold text-balance ">
            Yo,{" "}
            <img
              src="https://media1.giphy.com/media/M7W5CFczuzKBPFSumd/200w.gif"
              width="40px"
              style={{ display: "inline", marginRight: "10px" }}
            />
            i&apos;m Peter Shaan
          </h1>
          <p className="mx-auto prose prose-neutral dark:prose-invert ">
            22 years old from 🇮🇩, final Year Student of Informatic Technology, a
            Fullstack developer and also
            <a
              href="https://youtube.com/petershaan_"
              target="_blank"
              className="ml-1 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              <img
                src="/icon/yt.png"
                className="inline-flex m-0 mr-1"
                alt="image kecil"
                width={14}
                height={14}
              />
              Content Creator
            </a>{" "}
            and Video Editor, Lovely using
            <a
              href="https://nextjs.org"
              target="_blank"
              className="ml-2 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              <img
                src="/icon/next_dark.png"
                className="inline-flex m-0 mr-1"
                alt="image kecil"
                width={14}
                height={14}
              />
              Next.js
            </a>{" "}
            and
            <a
              href="https://nextjs.org"
              target="_blank"
              className="ml-2 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              <img
                src="/icon/react.png"
                className="inline-flex m-0 mr-1"
                alt="image kecil"
                width={14}
                height={14}
              />
              React
            </a>
          </p>
        </div>
      </section>
      <section className="grid grid-cols-3 px-8 gap-3">
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
      <section className="container mt-5">
        <p className="mx-auto prose prose-neutral dark:prose-invert ">
          Back in high school, I joined some online course that got me obsessed
          with programming. Huge thanks to Kak Justify for kickstarting my
          journey. That&apos;s when I began my path to becoming a programmer. I
          started out as a local editor, which made me fall in love with design
          and coding. Now, I&apos;m all about both.
        </p>
        <p className="mx-auto prose prose-neutral dark:prose-invert mt-5">
          I&apos;m truly believe that sharing programming knowledge can help a
          lot of people out there become creators, not just users or consumers
          of apps.
        </p>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col">
        <h2 className="text-2xl font-semibold text-center ">Experience</h2>
        <hr className="my-2" />
        <div className="prose prose-zinc dark:prose-invert max-w-full w-full mt-4">
          <p>May 2024 - Aug 2024</p>
          <h1 className="text-xl">
            <span className="font-semibold">Backend Engineer at</span>
            <a
              href="https://peduly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline px-2"
            >
              Peduly
            </a>
          </h1>

          <p className=" prose prose-neutral dark:prose-invert">
            Lead Laravel backend development for websites and web applications
            <br />
            Implement API integrations to enhance functionality.
          </p>

          <h5>Stack used</h5>
          <ul>
            <li>Laravel</li>
            <li>Midtrans</li>
            <li>mysql</li>
          </ul>
        </div>
        <hr className="my-2" />
        <div className="prose prose-zinc dark:prose-invert max-w-full w-full mt-4">
          <p>August 2023 - Present</p>
          <h1 className="text-xl my-2">
            <span className="font-semibold">Programmer at</span>
            <a
              href="https://unai.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline px-2"
            >
              Universitas Advent Indonesia
            </a>
          </h1>

          <p className="prose prose-neutral dark:prose-invert ">
            Create & Develop Website{" "}
            <a
              href="https://unai.edu"
              target="_blank"
              className="mx-2 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              unai.edu
            </a>
            &
            <a
              href="https://news.unai.edu"
              target="_blank"
              className="mx-2 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
            >
              news.unai.edu
            </a>
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

          <h5 className="mt-4 ">Stack used</h5>
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
