import { Plus, Search } from "lucide-react";
import type { ContactsToolbarProps } from "@/modules/contacts/types/contacts.types";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Skeleton } from "@/shared/components/shadcn/ui/skeleton";
import { InputText } from "@/shared/components/ui/inputs/input-text";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";

export function ContactsToolbar({
  filters,
  totalItems,
  filteredItems,
  isLoading = false,
  onCreate,
  onQueryChange,
}: ContactsToolbarProps) {
  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      {isLoading ? (
        <Stack gap="4">
          <Stack
            gap="4"
            className="xl:flex-row xl:items-start xl:justify-between"
          >
            <Stack gap="2">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-72" />
            </Stack>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </Stack>
          <Skeleton className="h-10 w-full rounded-xl" />
        </Stack>
      ) : (
        <Stack gap="4">
          <Stack
            gap="4"
            className="xl:flex-row xl:items-start xl:justify-between"
          >
            <Stack gap="1">
              <Typography className="font-semibold text-gray-7">
                {filteredItems === totalItems
                  ? `${totalItems} contatos cadastrados`
                  : `${filteredItems} de ${totalItems} contatos visíveis`}
              </Typography>
              <Typography
                variant="auxiliary"
                className="font-normal tracking-normal text-gray-5"
              >
                Um único cadastro pode ser usado em entradas e saídas, sem separar cliente e fornecedor.
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
              Novo contato
            </Button>
          </Stack>

          <InputText
            id="contacts-filter-query"
            label="Buscar contato"
            value={filters.query}
            placeholder="Nome, documento, e-mail ou telefone"
            rightIcon={
              <Search
                className="size-4 text-gray-5"
                aria-hidden="true"
              />
            }
            onChange={event => onQueryChange(event.target.value)}
          />
        </Stack>
      )}
    </Card>
  );
}
