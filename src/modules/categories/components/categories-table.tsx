import { PencilLine } from "lucide-react";
import { categoryStatusCopy, categoryTypeCopy } from "@/modules/categories/constants/categories.constants";
import { CategoryIcon } from "@/modules/categories/components/category-icon";
import type { CategoriesTableProps } from "@/modules/categories/types/categories.types";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { TableSkeleton } from "@/shared/components/ui/table-skeleton";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";

export function CategoriesTable({ items, hasAnyCategories, isLoading = false, onEdit }: CategoriesTableProps) {
  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      {isLoading ? (
        <TableSkeleton
          rows={6}
          cols={5}
        />
      ) : !hasAnyCategories ? (
        <Stack
          gap="2"
          className="py-8 text-center"
        >
          <Typography className="text-lg font-semibold text-gray-7">Nenhuma categoria cadastrada</Typography>
          <Typography className="font-normal text-gray-6">
            Crie a primeira categoria para organizar entradas e saídas por contexto financeiro.
          </Typography>
        </Stack>
      ) : items.length === 0 ? (
        <Stack
          gap="2"
          className="py-8 text-center"
        >
          <Typography className="text-lg font-semibold text-gray-7">Nenhuma categoria encontrada</Typography>
          <Typography className="font-normal text-gray-6">
            Ajuste os filtros para visualizar outras categorias cadastradas.
          </Typography>
        </Stack>
      ) : (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(category => (
              <TableRow key={category.id}>
                <TableCell className="text-left">
                  <Stack
                    direction="row"
                    gap="3"
                    alignment="center"
                  >
                    <Box
                      className="flex size-9 items-center justify-center rounded-xl border border-white/10 light:border-black/10"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      <CategoryIcon icon={category.icon} />
                    </Box>

                    <Stack gap="1">
                      <Typography className="font-semibold text-gray-7">{category.name}</Typography>
                      <Typography
                        variant="auxiliary"
                        className="font-normal tracking-normal text-gray-5"
                      >
                        {category.icon}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Box
                    as="span"
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                      categoryTypeCopy[category.type].className
                    )}
                  >
                    {categoryTypeCopy[category.type].label}
                  </Box>
                </TableCell>

                <TableCell>
                  <Stack
                    direction="row"
                    gap="2"
                    alignment="center"
                    className="justify-center"
                  >
                    <Box
                      className="size-4 rounded-full border border-white/10"
                      style={{ backgroundColor: category.color }}
                    />
                    <Typography
                      variant="auxiliary"
                      className="font-normal tracking-normal text-gray-5"
                    >
                      {category.color}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Stack
                    gap="1"
                    alignment="center"
                  >
                    <Box
                      as="span"
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                        categoryStatusCopy[category.status].className
                      )}
                    >
                      {categoryStatusCopy[category.status].label}
                    </Box>
                    <Typography
                      variant="auxiliary"
                      className="font-normal tracking-normal text-gray-5"
                    >
                      {categoryStatusCopy[category.status].note}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Button
                    type="button"
                    size="fit"
                    variant="outline"
                    className="min-h-9 rounded-xl px-3 py-2"
                    aria-label={`Editar ${category.name}`}
                    onClick={() => onEdit(category)}
                  >
                    <PencilLine
                      className="size-4"
                      aria-hidden="true"
                    />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
