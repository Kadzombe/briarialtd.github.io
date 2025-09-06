import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award, Zap, Users } from "lucide-react";

const features = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Quality First",
    description: "Our commitment to excellence ensures that we deliver robust, reliable, and high-quality software solutions that stand the test of time.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Agile Methodology",
    description: "We embrace an agile approach, allowing for flexibility, rapid iterations, and a final product that truly meets your evolving needs.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Collaborative Partnership",
    description: "We believe in working closely with our clients, fostering a transparent and collaborative partnership to achieve shared success.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 sm:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Our Commitment</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight font-headline sm:text-4xl">
            Why Choose Us?
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We are more than just developers; we are partners in your success, dedicated to delivering exceptional value.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-background/50 border-border/50 text-center h-full">
                <CardHeader className="items-center">
                    {feature.icon}
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription className="px-6 pb-6">
                    {feature.description}
                </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
