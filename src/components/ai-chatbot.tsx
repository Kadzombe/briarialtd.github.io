"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, SendHorizonal, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aiChatbotAssistant } from "@/ai/flows/ai-chatbot-assistant";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "bot";
  text: string;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom. The viewport is a child of the ref.
        const viewport = scrollAreaRef.current.children[0] as HTMLDivElement;
        if(viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await aiChatbotAssistant({ query: input });
      const botMessage: Message = { role: "bot", text: response.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-7 w-7" />
        <span className="sr-only">Open AI Chatbot</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>ARSMA AI</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 pr-4 -mr-6" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">
                    Hello! How can I help you today with BriAria's services, pricing, or demo bookings?
                  </p>
                </div>
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <Avatar>
                    <AvatarFallback>
                      {message.role === "user" ? <User /> : <Bot />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "p-3 rounded-lg max-w-[80%]",
                      message.role === "user"
                        ? "bg-gradient-to-r from-primary to-secondary text-black"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <SheetFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <SendHorizonal className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
