import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center">
       <Image
          src="https://picsum.photos/1920/1080?random=8"
          alt="A single jacaranda tree in bloom"
          data-ai-hint="jacaranda tree"
          fill
          className="object-cover -z-10 brightness-50"
          priority
        />
      <div className="container px-4 md:px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
            Innovative Software Solutions for a Digital-First World
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            BriAria Ltd crafts bespoke web and mobile applications to elevate your business and engage your customers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <a href="#contact">Request a Quote</a>
            </Button>
            <Button size="lg" asChild>
              <a href="#contact">Book a Demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
