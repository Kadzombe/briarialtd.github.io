"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

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
import { useFirebase } from "./firebase-provider";
import { verifyRecaptcha } from "@/ai/flows/verify-recaptcha";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA challenge."),
});

export function ContactForm() {
  const { toast } = useToast();
  const { db } = useFirebase();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      recaptcha: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!db) {
      toast({
        title: "Error: Database not connected",
        description: "Please check your Firebase connection and try again.",
        variant: "destructive",
      });
      return;
    }

    try {
       // Verify reCAPTCHA
      const recaptchaResult = await verifyRecaptcha({ token: values.recaptcha });
      if (!recaptchaResult.success) {
        toast({
          title: "Submission Failed",
          description: "Invalid reCAPTCHA. Please try again.",
          variant: "destructive",
        });
        recaptchaRef.current?.reset();
        form.setValue("recaptcha", "");
        return;
      }

      await addDoc(collection(db, 'contacts'), {
        name: values.name,
        email: values.email,
        message: values.message,
        submittedAt: serverTimestamp(),
      });
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll be in touch soon.",
      });
      form.reset();
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Submission Failed",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Inquiry</CardTitle>
        <CardDescription>Have a question? Drop us a line.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="recaptcha"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={(token) => field.onChange(token || "")}
                        theme="dark"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
