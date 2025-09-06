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
    description: "We build intelligent, automated investment platforms that provide data-driven financial advice and personalized portfolio management, democratizing wealth management for your clients.",
    image: "https://images.pexels.com/photos/6771120/pexels-photo-6771120.jpeg",
    aiHint: "financial chart",
  },
  {
    industry: "Healthcare",
    title: "Telemedicine & EHR Integration",
    description: "Our solutions facilitate secure, remote patient-doctor consultations and seamlessly integrate with Electronic Health Records (EHR) for streamlined, efficient healthcare delivery.",
    image: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg",
    aiHint: "telemedicine doctor",
  },
  {
    industry: "E-commerce",
    title: "Hyper-Personalized Retail",
    description: "Leverage AI to create a unique shopping experience. Our platforms offer smart product recommendations, personalized marketing, and dynamic pricing to boost sales and customer loyalty.",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg",
    aiHint: "shopping cart",
  },
  {
    industry: "Education",
    title: "Interactive e-Learning Platform",
    description: "Engage students with a dynamic online learning environment, featuring live-video classes, collaborative tools, and progress tracking for a modern educational experience.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
    aiHint: "online learning",
  },
  {
    industry: "Real Estate",
    title: "Virtual Property Tour Platform",
    description: "Transform the property viewing experience with immersive 3D virtual tours and an integrated booking system, allowing potential buyers to explore homes from anywhere, anytime.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    aiHint: "modern house",
  },
  {
    industry: "FinTech",
    title: "Secure Payment Gateway",
    description: "We deliver robust, compliant, and highly secure payment processing solutions for global online transactions, complete with advanced fraud detection and multi-currency support.",
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
              variant={activeIndustry === industry ? "outline" : "default"}
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
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <p className="text-sm font-medium text-primary">{solution.industry}</p>
                <h3 className="mt-2 text-lg font-semibold text-primary-foreground">{solution.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{solution.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
