"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  projectDetails: z.string().min(20, "Please provide more details about your project."),
});

export function QuoteForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addDoc(collection(db, "quoteSubmissions"), {
        ...values,
        submittedAt: new Date(),
      });
      toast({
        title: "Quote Request Sent!",
        description: "We've received your request and will get back to you with a quote soon.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Quote</CardTitle>
        <CardDescription>Tell us about your project to receive a custom quote.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Details</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Describe your project, goals, and key features..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="recaptcha-quote" disabled />
              <label
                htmlFor="recaptcha-quote"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I'm not a robot (reCAPTCHA placeholder)
              </label>
            </div>
            <Button type="submit" className="w-full">
              Get My Quote
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
