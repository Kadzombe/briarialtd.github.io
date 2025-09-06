"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Sparkles, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";

import { cn } from "@/lib/utils";
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
import { generateProjectDescription } from "@/ai/flows/generate-project-description";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirebase } from "./firebase-provider";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  projectDetails: z.string().min(20, "Please provide more details about your project."),
  bookDemo: z.boolean().default(false).optional(),
  date: z.date().optional(),
  time: z.string().optional(),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA challenge."),
}).refine(data => {
    if (data.bookDemo && !data.date) {
        return false;
    }
    return true;
}, {
    message: "A date is required to book a demo.",
    path: ["date"],
}).refine(data => {
    if (data.bookDemo && !data.time) {
        return false;
    }
    return true;
}, {
    message: "A time is required to book a demo.",
    path: ["time"],
});

const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];


export function QuoteAndDemoForm() {
  const { toast } = useToast();
  const { db } = useFirebase();
  const [isGenerating, setIsGenerating] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectDetails: "",
      bookDemo: false,
      recaptcha: ""
    },
  });

  const { isSubmitting } = form.formState;
  const watchBookDemo = form.watch("bookDemo");

  const handleGenerateDescription = async () => {
    const projectOutline = form.getValues("projectDetails");
    if (!projectOutline || projectOutline.length < 10) {
      form.setError("projectDetails", {
        type: "manual",
        message: "Please provide a brief outline first (at least 10 characters).",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateProjectDescription({ projectOutline });
      form.setValue("projectDetails", result.projectDescription, {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Error generating project description:", error);
      toast({
        title: "AI Assistant Error",
        description: "There was a problem generating the description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
      const quoteData: any = {
        name: values.name,
        email: values.email,
        company: values.company || "",
        projectDetails: values.projectDetails,
        submittedAt: serverTimestamp(),
      };

      if (values.bookDemo && values.date && values.time) {
        const time24h = new Date(`1970-01-01 ${values.time}`).toTimeString().split(' ')[0];
        const combinedDateTime = new Date(`${format(values.date, "yyyy-MM-dd")}T${time24h}`);
        
        const demoData = { ...quoteData, demoDateTime: combinedDateTime.toISOString() };
        await addDoc(collection(db, 'demo_requests'), demoData);
      }
      
      await addDoc(collection(db, 'quotes'), quoteData);
      
      let toastTitle = "Quote Request Sent!";
      let toastDescription = "We've received your request and will be in touch soon.";

      if (values.bookDemo) {
        toastTitle = "Demo Booked & Quote Requested!";
        toastDescription = `We've scheduled your demo for ${format(values.date!, "PPP")} at ${values.time}. A confirmation will be sent shortly.`;
      }

      toast({
        title: toastTitle,
        description: toastDescription,
      });
      form.reset();
      recaptchaRef.current?.reset();

    } catch (error) {
       console.error("Error submitting form:", error);
       toast({
         title: "Submission Failed",
         description: "There was a problem processing your request. Please try again.",
         variant: "destructive",
       });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Quote & Book a Demo</CardTitle>
        <CardDescription>Tell us about your project to receive a custom quote. You can also book a demo.</CardDescription>
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
             <Button type="button" variant="outline" onClick={handleGenerateDescription} disabled={isGenerating || isSubmitting} className="w-full">
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate with AI
            </Button>
            
            <FormField
                control={form.control}
                name="bookDemo"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                                I also want to book a demo
                            </FormLabel>
                        </div>
                    </FormItem>
                )}
            />

            {watchBookDemo && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <FormField
                   control={form.control}
                   name="date"
                   render={({ field }) => (
                     <FormItem className="flex flex-col">
                       <FormLabel>Date</FormLabel>
                       <Popover>
                         <PopoverTrigger asChild>
                           <FormControl>
                             <Button
                               variant={"outline"}
                               className={cn(
                                 "w-full pl-3 text-left font-normal",
                                 !field.value && "text-muted-foreground"
                               )}
                             >
                               {field.value ? (
                                 format(field.value, "PPP")
                               ) : (
                                 <span>Pick a date</span>
                               )}
                               <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                             </Button>
                           </FormControl>
                         </PopoverTrigger>
                         <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                             mode="single"
                             selected={field.value}
                             onSelect={field.onChange}
                             disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                             initialFocus
                           />
                         </PopoverContent>
                       </Popover>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <FormField
                   control={form.control}
                   name="time"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Time</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger>
                             <SelectValue placeholder="Select a time slot" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent>
                           {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
               </div>
            )}
           
            <FormField
              control={form.control}
              name="recaptcha"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={field.onChange}
                        theme="dark"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
             {isSubmitting ? "Submitting..." : (watchBookDemo ? "Schedule Demo & Get Quote" : "Get My Quote")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}