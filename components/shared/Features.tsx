import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { features } from "@/lib/constants";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";

const Features = () => {
  return (
    <div className="mt-10 mx-4" id="features">
      <section className="text-center">
        <article className="flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-4xl sm:text-5xl">
              Powerful AI Features to Transform Your Resume
            </h1>
            <p className="text-lg font-light text-gray-900 dark:text-gray-200 sm:text-xl">
              Our advanced AI technology helps you create professional resumes
              that stand out and get noticed by recruiters and ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-4">
            {features.map((feature) => (
              <Card key={feature.id} className="bg-gray-500">
                <Image
                  src={feature.image}
                  alt="img"
                  width={100}
                  height={100}
                  className="px-4 py-2"
                />
                <CardHeader>
                  <CardTitle>{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>{feature.description}</CardContent>
                <CardDescription className="space-y-2">
                  {feature.points.map((f, index) => (
                    <div key={index} className="flex mx-4 gap-2 ">
                      <Check />
                      <p>{f}</p>
                    </div>
                  ))}
                </CardDescription>
              </Card>
            ))}
          </div>
          <Button className="w-full sm:w-80 font-semibold text-lg">
            Explore <ArrowRight />
          </Button>
        </article>
      </section>
    </div>
  );
};

export default Features;
