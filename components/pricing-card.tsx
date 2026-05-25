import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
}

export function PricingCard({ name, description, price, features, cta }: PricingCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-slate-200">{description}</CardDescription>
        <p className="mt-4 text-4xl font-semibold">{price}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-slate-200">
          {features.map((feature) => <li key={feature}>• {feature}</li>)}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{cta}</Button>
      </CardFooter>
    </Card>
  );
}
