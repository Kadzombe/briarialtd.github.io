import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, PenTool, Cloud } from "lucide-react";

const services = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Web Development",
    description: "Creating responsive, high-performance websites and web applications tailored to your business needs.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile App Development",
    description: "Building native and cross-platform mobile apps for iOS and Android to reach your customers on the go.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful user interfaces that provide an exceptional user experience.",
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary" />,
    title: "Cloud Solutions",
    description: "Leveraging cloud infrastructure to create scalable, reliable, and secure applications.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Our Expertise</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            What We Do
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We offer a comprehensive suite of software development services to bring your vision to life.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col items-center text-center p-6 transition-transform transform hover:-translate-y-2">
              <CardHeader>
                {service.icon}
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
