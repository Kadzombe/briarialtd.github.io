import Image from "next/image";
import { Briefcase, Menu, Linkedin, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Solutions" },
  { href: "#contact", label: "Contact" },
];

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white text-black">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Briefcase className="h-8 w-8 mr-2" />
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
        <div className="flex flex-1 items-center justify-end gap-2">
            <div className="hidden md:flex items-center gap-1">
                 <Button variant="ghost" size="icon" asChild>
                    <a href="https://www.linkedin.com/company/briaria-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://www.instagram.com/briarialtd" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://www.facebook.com/briarialtd" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                    <Facebook className="h-4 w-4" />
                    <span className="sr-only">Facebook</span>
                    </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href="https://x.com/briarialtd" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">X</span>
                    </a>
                </Button>
            </div>
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
                  <Briefcase className="h-8 w-8 mr-2" />
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
                 <div className="flex justify-center gap-2 mt-8">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://www.linkedin.com/company/briaria-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://www.instagram.com/briarialtd" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://www.facebook.com/briarialtd" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="https://x.com/briarialtd" target="_blank" rel="noopener noreferrer" className="text-black hover:bg-primary/20">
                        <XIcon className="h-5 w-5" />
                        <span className="sr-only">X</span>
                        </a>
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
