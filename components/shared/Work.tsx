import { works } from "@/lib/constants";
import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const Work = () => {
  return (
    <div className="mt-10 mx-4" id="works">
      <section className="text-center flex flex-col items-center">
        <article className="">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl sm:text-5xl">
              How Our AI Resume Builder Works
            </h1>
            <p className="text-lg font-light text-gray-900 dark:text-gray-200 sm:text-xl">
              Create a professional resume in just minutes with our easy 3-step
              process. No design skills required.
            </p>
          </div>
        </article>

        {works.map((work) => (
          <div key={work.id} className="mt-10 flex flex-col items-center">
            <div className="size-32 flex justify-center items-center rounded-full bg-blue-100 dark:bg-blue-900">
              <div className="size-20 text-3xl font-bold flex justify-center items-center rounded-full bg-blue-500 opacity-100">
                {work.id}
              </div>
            </div>

            <div className="-translate-y-6 space-y-4">
              <h3 className="font-bold text-3xl">{work.title}</h3>
              <p className="text-lg">{work.description}</p>

              {work.points.map((point, index) => (
                <div key={index} className="flex justify-center gap-2 mt-5">
                  <Check className="text-green-500" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="border my-10 px-4 py-8 rounded-lg bg-gradient-to-br from-green-200 from-0% via-neutral-700 to-violet-200 space-y-4">
          <h3 className="font-semibold text-2xl">
            Ready to Create Your Professional Resume?
          </h3>
          <p className="text-lg">
            Join over 2.5 million professionals who have created job-winning
            resumes with our AI-powered platform.
          </p>

          <div className="space-x-2">
            <Button className="bg-violet-500 text-white hover:bg-violet-600">
              Get Started Free
            </Button>
            <Button>View Templates</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
