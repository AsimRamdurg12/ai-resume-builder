"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { pricing } from "@/lib/constants";
import { Switch } from "../ui/switch";
import { Check } from "lucide-react";

const Pricing = () => {
  const [year, setYear] = useState(false);

  return (
    <div className="mt-10 mx-4" id="pricing">
      <section className="text-center">
        <article>
          <div className="space-y-4">
            <h1 className="font-bold text-4xl sm:text-5xl">
              Simple, transparent Pricing
            </h1>
            <p className="text-lg font-light text-gray-900 dark:text-gray-200 sm:text-xl">
              Choose the plan that works best for your needs. All plans include
              core AI resume building features.
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 my-4 text-xl font-semibold">
            <span>Monthly</span>
            <Switch className="h-9 w-16" onClick={() => setYear(!year)} />
            <span>Yearly</span>
          </div>

          <div className="grid grid-cols1 lg:grid-cols-3 gap-4">
            {pricing.map((price) => (
              <Card key={price.id} className="text-start">
                <CardHeader>
                  <h2 className="font-bold text-2xl">{price.title}</h2>
                  <CardTitle className="text-4xl">
                    {year ? price.price2 : price.price1}
                  </CardTitle>
                  <CardDescription>
                    {year ? price.duration2 : price.duration1}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-lg">
                  {price.description}
                </CardContent>

                {price.points.map((point, index) => (
                  <CardContent key={index} className="flex items-center gap-2">
                    <Check className="text-green-500" />
                    <p className="font-semibold">{point}</p>
                  </CardContent>
                ))}

                <CardFooter>
                  <Button className="w-full">{price.button}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Pricing;
