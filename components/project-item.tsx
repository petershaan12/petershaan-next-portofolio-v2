import Image from "next/image";
import React from "react";

interface ProjectItemProps {
  src: string;
  title: string;
  tags: string[];
  year: string;
  url: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  src,
  title,
  tags,
  year,
  url,
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="rounded-xl overflow-clip relative transition-all border border-transparent dark:hover:border-white hover:border-black cursor-pointer">
        <Image
          alt={`project_${title.replace(/\s+/g, "").toLowerCase()}`}
          src={src}
          width={500}
          height={500}
          className="aspect-[12/6]"
        />
      </div>
      <div className="mt-2 px-2 py-1 w-full">
        <h6 className="font-bold text-sm dark:text-gray-400 ">{title}</h6>
        <p className="font-regular text-xs dark:text-gray-400">[{year}]</p>
        {tags.map((tag) => (
          <button
            key={tag}
            className="rounded-full bg-green-200 px-3 py-1 text-xs mt-2 text-green-800 font-semibold hover:text-white hover:bg-green-600 dark:hover:text-white dark:hover:bg-green-600 mr-2 dark:bg-green-950 dark:text-green-400"
          >
            {tag}
          </button>
        ))}
      </div>
    </a>
  );
};

export default ProjectItem;
