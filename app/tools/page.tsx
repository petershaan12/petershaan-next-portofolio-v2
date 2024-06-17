import { Metadata } from "next";
import ProjectsItem from "@/components/project-item";
import ToolsItem from "@/components/tools-item";
import { useTheme } from "next-themes";

export const metadata: Metadata = {
  title: "My Tools",
  description: "All my tools",
};

export default async function ProjectPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Tools</h1>
        <p className="prose prose-neutral dark:prose-invert ">
          mulai dari hal development, design, maupun produktivitas
        </p>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-2 gap-2">
        <ToolsItem
          url="https://react.dev/"
          lightImageSrc="/icon/react.png"
          toolName="React Js"
          description="For Building Interfaces"
        />
        <ToolsItem
          url="https://nextjs.org/"
          darkImageSrc="/icon/next_dark.png"
          lightImageSrc="/icon/next.png"
          toolName="Next Js"
          description="For Building Website"
        />
        <ToolsItem
          url="https://wordpress.org/"
          lightImageSrc="/icon/wordpress.png"
          toolName="Wordpress"
          description="For Building Website"
        />
        <ToolsItem
          url="https://tailwindcss.com/"
          lightImageSrc="/icon/tailwind.png"
          toolName="Tailwind CSS"
          description="For Styling Website"
        />
        <ToolsItem
          url="https://vercel.com/"
          darkImageSrc="/icon/vercel_dark.png"
          lightImageSrc="/icon/vercel.png"
          toolName="Vercel"
          description="For Styling Website"
        />
        <ToolsItem
          url="https://code.visualstudio.com/"
          lightImageSrc="/icon/vscode.png"
          toolName="Visual Studio Code"
          description="Text Editor"
        />

        <ToolsItem
          url="https://github.com"
          darkImageSrc="/icon/git_dark.png"
          lightImageSrc="/icon/git.png"
          toolName="GitHub"
          description="Version Control System"
        />

        <ToolsItem
          url="https://developer.android.com/studio"
          lightImageSrc="/icon/android.png"
          toolName="Android Studio"
          description="Android Development"
        />

        <ToolsItem
          url="https://www.figma.com/"
          lightImageSrc="/icon/figma.png"
          toolName="Figma"
          description="UI/UX"
        />

        <ToolsItem
          url="https://www.microsoft.com/en-us/sql-server/"
          lightImageSrc="/icon/sqlserver.png"
          darkImageSrc="/icon/sqlserver_dark.png"
          toolName="Sql Server Management Studio (SMSS)"
          description="Database"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ToolsItem
          url="https://www.msi.com/Laptop/GF65-Thin-10UX/Specification"
          lightImageSrc="/icon/msi.png"
          toolName="MSI GF65"
          description="Laptop"
        />

        <ToolsItem
          url="https://www.tokopedia.com/sakurabdg/mouse-gaming-msi-m99-orignal?utm_source=google&utm_medium=organic&utm_campaign=pdp-seo"
          lightImageSrc="/icon/mouse.png"
          toolName="Mouse MSI M99"
          description="Mouse"
        />
      </div>
    </div>
  );
}
