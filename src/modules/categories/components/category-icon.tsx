import { Banknote, BriefcaseBusiness, Landmark, Megaphone, ReceiptText, Wallet } from "lucide-react";
import type { CategoryIconProps } from "@/modules/categories/types/categories.types";
import { cn } from "@/shared/lib/utils";

const categoryIconMap = {
  banknote: Banknote,
  briefcase: BriefcaseBusiness,
  landmark: Landmark,
  megaphone: Megaphone,
  receipt: ReceiptText,
  wallet: Wallet,
} as const;

export function CategoryIcon({ icon, className }: CategoryIconProps) {
  const Icon = categoryIconMap[icon];

  return (
    <Icon
      className={cn("size-4", className)}
      aria-hidden="true"
    />
  );
}
