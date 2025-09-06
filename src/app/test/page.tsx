
"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/header";

export default function TestPage() {
  const { toast } = useToast();

  const handleTestWrite = async () => {
    try {
      const docRef = await addDoc(collection(db, "testSubmissions"), {
        test: "success",
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      toast({
        title: "Firestore Write Successful!",
        description: `Document written to 'testSubmissions' with ID: ${docRef.id}`,
      });
    } catch (error: any) {
      console.error("Error writing document: ", error);
      toast({
        title: "Firestore Write Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-10">
        <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Firebase Connection Test</h1>
            <p className="text-muted-foreground mb-6">
                This page is for diagnostic purposes. Clicking the button will attempt a direct write to a 'testSubmissions' collection in Firestore.
                Check the browser console and the toast messages for the result.
            </p>
            <Button onClick={handleTestWrite} size="lg">
                Attempt Firestore Write
            </Button>
        </div>
      </main>
    </>
  );
}
