import { Metadata } from "next";
import ProjectsItem from "@/components/project-item";

export const metadata: Metadata = {
  title: "Peter Projects",
  description: "All my projects",
};

export default async function ProjectPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">my projects</h1>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6  mt-8">
        <ProjectsItem
          src="/blog/bangkit.png"
          title="Fungi.info - Capstone Bangkit Academy 2024 Batch 1"
          tags={["Android", "Kotlin", "Tensorflow Lite"]}
          year="2024"
          url="https://github.com/Fungi-info-Bangkit-Capstone/android"
        />
        <ProjectsItem
          src="/projects/dik-dea.png"
          title="DIK DEA"
          tags={["Next Js", "Prisma", "Clerk"]}
          year="2024"
          url="https://dik-dea.com/"
        />
        <ProjectsItem
          src="/projects/fti.png"
          title="FTI Faculty"
          tags={["wordpress", "avada"]}
          year="2024"
          url="https://fti.unai.edu/"
        />
        <ProjectsItem
          src="/projects/news.unai.png"
          title="UNAI News"
          tags={["wordpress", "avada"]}
          year="2024"
          url="https://news.unai.edu/"
        />
        <ProjectsItem
          src="/projects/unai.png"
          title="Universitas Advent Indonesia"
          tags={["wordpress", "avada"]}
          year="2023 - 2024"
          url="https://www.unai.edu"
        />
        <ProjectsItem
          src="/projects/online.unai.png"
          title="Fitur Evaluasi Diri online.unai.edu"
          tags={["php", "sql server"]}
          year="2023"
          url="https://online.unai.edu/mhs/login.php"
        />

        <ProjectsItem
          src="/projects/gapaTetris.png"
          title="GAPA Tetris"
          tags={["Java FX", "Scene Builder"]}
          year="2023"
          url="https://github.com/petershaan12/GAPA-Tetris?tab=readme-ov-file"
        />

        <ProjectsItem
          src="/projects/thewildoasis.png"
          title="The Wild Oasis"
          tags={["React JS", "Supabase", "Styled Component"]}
          year="2023"
          url="https://github.com/petershaan12/the-wild-oasis"
        />

        <ProjectsItem
          src="/projects/thefastreactpizza.png"
          title="The Fast React Pizza"
          tags={["React Router", "Tailwind CSS"]}
          year="2023"
          url="https://github.com/petershaan12/the-fast-react-pizza"
        />

        <ProjectsItem
          src="/projects/wonderfulIndonesia.png"
          title="Clonning Website Wonderful Indonesia"
          tags={["HTML", "Bootstrap 5"]}
          year="2023"
          url="https://github.com/petershaan12/Wonderful-Indonesia-Clone"
        />

        <ProjectsItem
          src="/projects/indodrives.png"
          title="Indo Drives Solution"
          tags={["wordpress", "c-panel"]}
          year="2019"
          url="http://www.indodrives.rf.gd"
        />
      </div>
    </div>
  );
}
