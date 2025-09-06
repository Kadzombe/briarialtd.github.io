import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:py-6">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
           <p>
            © 2025 BriAria Ltd. All Rights Reserved.
          </p>
          <p >
           Office 11929, 182-184 High Street North, East Ham, London, United Kingdom, E6 2JA
          </p>
          <p>
            Registered Company Number: 16349064
          </p>
        </div>
      </div>
    </footer>
  );
}
