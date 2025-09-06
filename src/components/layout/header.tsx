import Image from "next/image";
import { Code, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Solutions" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white text-black">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Code className="h-8 w-8 mr-2" />
          <a href="/" className="font-bold text-lg">
            BriAria Ltd
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button asChild className="hidden md:flex">
            <a href="#contact">Request a Quote</a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white text-black">
              <div className="flex flex-col pt-8">
                <div className="mb-8 flex items-center">
                  <Code className="h-8 w-8 mr-2" />
                  <a href="/" className="font-bold text-lg">
                    BriAria Ltd
                  </a>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Button asChild className="mt-4">
                    <a href="#contact">Request a Quote</a>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
