"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const industries = ["All", "FinTech", "Healthcare", "E-commerce", "Education", "Real Estate"];
const solutions = [
  {
    industry: "FinTech",
    title: "AI-Powered Robo-Advisory",
    description: "Intelligent, automated investment platforms providing data-driven financial advice and personalized portfolio management to democratize wealth management.",
    image: "https://images.pexels.com/photos/6771120/pexels-photo-6771120.jpeg",
    aiHint: "financial chart",
  },
  {
    industry: "Healthcare",
    title: "Telemedicine & EHR Integration",
    description: "Secure, remote patient-doctor consultations seamlessly integrated with Electronic Health Records for streamlined, efficient healthcare delivery.",
    image: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg",
    aiHint: "telemedicine doctor",
  },
  {
    industry: "E-commerce",
    title: "Hyper-Personalized Retail",
    description: "Leverage AI for a unique shopping experience with smart recommendations, personalized marketing, and dynamic pricing to boost sales and customer loyalty.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    aiHint: "shopping cart",
  },
  {
    industry: "Education",
    title: "Interactive e-Learning Platform",
    description: "Engage students with a dynamic online learning environment, featuring live-video classes, collaborative tools, and progress tracking.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    aiHint: "online learning",
  },
  {
    industry: "Real Estate",
    title: "Virtual Property Tour Platform",
    description: "Transform property viewing with immersive 3D virtual tours and an integrated booking system, allowing buyers to explore homes from anywhere.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    aiHint: "modern house",
  },
  {
    industry: "FinTech",
    title: "Secure Payment Gateway",
    description: "Robust, compliant, and highly secure payment processing for global online transactions, with advanced fraud detection and multi-currency support.",
    image: "https://images.pexels.com/photos/7620568/pexels-photo-7620568.jpeg",
    aiHint: "secure payment",
  },
];

export function SolutionsSection() {
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filteredSolutions =
    activeIndustry === "All"
      ? solutions
      : solutions.filter((s) => s.industry === activeIndustry);

  return (
    <section id="solutions" className="py-20 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Our Work</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Industry-Specific Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We have experience delivering powerful solutions across various sectors.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mt-10">
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={activeIndustry === industry ? "default" : "outline"}
              onClick={() => setActiveIndustry(industry)}
              className="capitalize"
            >
              {industry}
            </Button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredSolutions.map((solution) => (
            <Card key={solution.title} className="group overflow-hidden relative transition-shadow hover:shadow-lg hover:shadow-primary/20">
              <div className="aspect-video overflow-hidden">
                <Image 
                  src={solution.image} 
                  alt={solution.title}
                  data-ai-hint={solution.aiHint}
                  width={600}
                  height={400} 
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <p className="text-sm font-medium text-primary">{solution.industry}</p>
                <h3 className="mt-1 text-lg font-semibold text-primary-foreground leading-tight">{solution.title}</h3>
                <p className="mt-1 text-sm text-gray-300 leading-snug">{solution.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
