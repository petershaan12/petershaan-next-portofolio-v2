import { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const interBold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold;

    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    const logo = "</ps>";

    if (!title) {
      return new Response("No title provider", { status: 500 });
    }

    const heading =
      title.length > 148 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-36 w-full h-full items-start text-white "
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_URL}/background_ogi.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div tw="flex items-center">
            <p tw="ml-2 font-bold text-4xl">{logo}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-[100px] font-bold">{heading}</div>
          </div>
          <div tw="flex items-center w-full justify-between ">
            <div tw="flex text-3xl">{siteConfig.url}</div>
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
