import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import resume from "../../public/resume-iage.png";
import { hero } from "@/lib/constants";

const Hero = () => {
  return (
    <div className="mt-10 mx-4" id="home">
      <section className="text-center">
        <article className="flex flex-col lg:flex-row lg:justify-between lg:items-stretch items-center gap-4 lg:gap-20">
          <div className="flex flex-col gap-4 lg:gap-8 items-center justify-between">
            <h1 className="font-bold text-4xl sm:text-5xl">
              Craft the Perfect Resume with AI. Optimize, Enhance, and Get
              Noticed!
            </h1>
            <p className="text-lg font-light text-gray-900 dark:text-gray-200 sm:text-xl">
              Create standout resumes in minutes with our advanced AI
              technology. Tailor your resume to specific job descriptions and
              increase your interview chances by 3x.
            </p>
            <Button className="w-full sm:w-80 font-semibold text-lg">
              Get Started
            </Button>
          </div>
          <Image
            src={resume}
            alt="resume"
            loading="lazy"
            className="w-full rounded-lg my-10 lg:my-0"
          />
        </article>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10 gap-4">
          {hero.map((h) => (
            <div key={h.id}>
              <h2 className="font-bold text-3xl text-teal-500">{h.number}</h2>
              <p className="text-gray-400 text-lg">{h.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
