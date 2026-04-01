import { Plus } from "lucide-react";
import type { CategoriesToolbarProps } from "@/modules/categories/types/categories.types";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function CategoriesToolbar({ totalItems, filteredItems, onCreate, isLoading = false }: CategoriesToolbarProps) {
  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      {isLoading ? (
        <Stack
          gap="4"
          className="lg:flex-row lg:items-center lg:justify-between"
        >
          <Stack gap="2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </Stack>
          <Skeleton className="h-10 w-40 rounded-xl" />
        </Stack>
      ) : (
        <Stack
          gap="4"
          className="lg:flex-row lg:items-center lg:justify-between"
        >
          <Stack gap="1">
            <Typography className="font-semibold text-gray-7">
              {filteredItems === totalItems
                ? `${totalItems} categorias configuradas`
                : `${filteredItems} de ${totalItems} categorias visíveis`}
            </Typography>
            <Typography
              variant="auxiliary"
              className="font-normal tracking-normal text-gray-5"
            >
              Categorias inativas continuam visíveis para gestão, mas deixam de ser elegíveis para uso.
            </Typography>
          </Stack>

          <Button
            type="button"
            size="fit"
            className="min-h-10 rounded-xl px-4 py-2"
            onClick={onCreate}
          >
            <Plus
              className="size-4"
              aria-hidden="true"
            />
            Nova categoria
          </Button>
        </Stack>
      )}
    </Card>
  );
}
