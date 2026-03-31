import { Card } from "@/shared/components/shadcn/ui/card";
import { Typography } from "@/shared/components/ui/typography";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Card className="gap-4 border border-white/10 bg-card light:border-black/10">
      <div className="space-y-2">
        <Typography variant="subtitle">{title}</Typography>
        <Typography className="max-w-3xl text-gray-6">{description}</Typography>
      </div>
    </Card>
  );
}
