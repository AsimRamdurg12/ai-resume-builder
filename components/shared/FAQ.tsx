"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const FAQ = () => {
  return (
    <section className="mx-4 mt-10 flex flex-col" id="faq">
      <div className="flex flex-col text-center gap-4">
        <h1 className="font-bold text-3xl sm:text-4xl">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h1>
        <p className="text-lg font-light text-gray-900 dark:text-gray-200 sm:text-xl">
          Everything you need to know about our AI Resume builder platform.
        </p>
      </div>
      <div className="my-4">
        <Accordion
          question="Can I change plans later?"
          answer="Yes, you can upgrade, downgrade, or cancel your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive a prorated credit towards your next billing cycle."
        />
        <Accordion
          question="Is there a free trial?"
          answer="We offer a free plan with limited features that you can use indefinitely. For paid plans, we offer a 7-day money-back guarantee if you're not satisfied with our service."
        />
        <Accordion
          question="What payment methods do you accept?"
          answer="We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. For Business plans, we also accept wire transfers and invoicing."
        />
      </div>
    </section>
  );
};

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion = ({ question, answer }: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const openRef = useRef(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!openRef.current?.contains(e.target)) {
        setAccordionOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="py-2 bg-gray-50 border my-2 rounded-lg" ref={openRef}>
      <Button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex shadow-none justify-between w-full bg-gray-50 hover:bg-gray-50 text-black"
      >
        <span className="font-semibold sm:text-base text-wrap text-left">
          {question}
        </span>

        {accordionOpen ? (
          <ChevronUp className="transform origin-center transition duration-200 ease-out " />
        ) : (
          <ChevronDown className="transform origin-center transition duration-200 ease-out" />
        )}
      </Button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-4">{answer}</div>
      </div>
    </div>
  );
};

export default FAQ;
