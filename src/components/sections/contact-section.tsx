"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactForm } from "@/components/contact-form";
import { QuoteForm } from "@/components/quote-form";
import { DemoForm } from "@/components/demo-form";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Get in Touch</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight font-headline sm:text-4xl">
              Let's Build Something Great
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Have a project in mind or want to see our platform in action? Reach out today.
            </p>
        </div>
        <div className="max-w-xl mx-auto mt-16">
          <Tabs defaultValue="quote" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quote">Request a Quote</TabsTrigger>
              <TabsTrigger value="demo">Book a Demo</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>
            <TabsContent value="quote">
              <QuoteForm />
            </TabsContent>
            <TabsContent value="demo">
              <DemoForm />
            </TabsContent>
            <TabsContent value="contact">
              <ContactForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
