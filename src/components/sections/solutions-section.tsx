"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const industries = ["All", "FinTech", "Healthcare", "E-commerce"];
const solutions = [
  {
    industry: "FinTech",
    title: "Secure Payment Gateway",
    description: "A robust and secure payment processing solution for online transactions.",
    image: "https://picsum.photos/600/400?random=1",
    aiHint: "secure payment",
  },
  {
    industry: "Healthcare",
    title: "Patient Data Management",
    description: "A HIPAA-compliant platform for managing patient records and appointments.",
    image: "https://picsum.photos/600/400?random=2",
    aiHint: "patient data",
  },
  {
    industry: "E-commerce",
    title: "Personalized Shopping Cart",
    description: "An AI-powered shopping cart that provides personalized product recommendations.",
    image: "https://picsum.photos/600/400?random=3",
    aiHint: "shopping cart",
  },
  {
    industry: "FinTech",
    title: "Robo-Advisory Platform",
    description: "Automated investment advice and portfolio management for your clients.",
    image: "https://picsum.photos/600/400?random=4",
    aiHint: "financial chart",
  },
  {
    industry: "Healthcare",
    title: "Telemedicine App",
    description: "Connect doctors and patients remotely with our secure video consultation app.",
    image: "https://picsum.photos/600/400?random=5",
    aiHint: "telemedicine",
  },
  {
    industry: "E-commerce",
    title: "Inventory Management System",
    description: "Streamline your supply chain with real-time inventory tracking and analytics.",
    image: "https://picsum.photos/600/400?random=6",
    aiHint: "warehouse inventory",
  },
];

export function SolutionsSection() {
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filteredSolutions =
    activeIndustry === "All"
      ? solutions
      : solutions.filter((s) => s.industry === activeIndustry);

  return (
    <section id="solutions" className="py-20 sm:py-32 bg-card">
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

        <div className="flex justify-center gap-2 mt-10">
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
            <Card key={solution.title} className="overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/20">
              <CardHeader className="p-0">
                <div className="aspect-video relative">
                  <Image 
                    src={solution.image} 
                    alt={solution.title}
                    data-ai-hint={solution.aiHint}
                    fill 
                    className="object-cover"
                   />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-primary">{solution.industry}</p>
                <CardTitle className="mt-2">{solution.title}</CardTitle>
                <CardDescription className="mt-2">{solution.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
