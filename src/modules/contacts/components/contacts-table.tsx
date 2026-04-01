import { PencilLine } from "lucide-react";
import { contactStatusCopy } from "@/modules/contacts/constants/contacts.constants";
import type { ContactsTableProps } from "@/modules/contacts/types/contacts.types";
import { Button } from "@/shared/components/shadcn/ui/button";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/shadcn/ui/table";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { TableSkeleton } from "@/shared/components/ui/table-skeleton";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";

function getFallbackText(value: string) {
  return value || "Não informado";
}

export function ContactsTable({ items, hasAnyContacts, isLoading = false, onEdit }: ContactsTableProps) {
  return (
    <Card className="border border-white/10 bg-card/90 p-4 light:border-black/10">
      {isLoading ? (
        <TableSkeleton
          rows={6}
          cols={6}
        />
      ) : !hasAnyContacts ? (
        <Stack
          gap="2"
          className="py-8 text-center"
        >
          <Typography className="text-lg font-semibold text-gray-7">Nenhum contato cadastrado</Typography>
          <Typography className="font-normal text-gray-6">
            Cadastre o primeiro contato para vincular lançamentos com mais contexto financeiro.
          </Typography>
        </Stack>
      ) : items.length === 0 ? (
        <Stack
          gap="2"
          className="py-8 text-center"
        >
          <Typography className="text-lg font-semibold text-gray-7">Nenhum contato encontrado</Typography>
          <Typography className="font-normal text-gray-6">
            Ajuste a busca para visualizar outros contatos disponíveis.
          </Typography>
        </Stack>
      ) : (
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Contato</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(contact => (
              <TableRow key={contact.id}>
                <TableCell className="text-left">
                  <Stack gap="1">
                    <Typography className="font-semibold text-gray-7">{contact.name}</Typography>
                    <Typography
                      variant="auxiliary"
                      className="font-normal tracking-normal text-gray-5"
                    >
                      {contact.notes || "Disponível para lançamentos de entrada e saída."}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="auxiliary"
                    className="font-normal tracking-normal text-gray-5"
                  >
                    {getFallbackText(contact.document)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="auxiliary"
                    className="font-normal tracking-normal text-gray-5"
                  >
                    {getFallbackText(contact.email)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="auxiliary"
                    className="font-normal tracking-normal text-gray-5"
                  >
                    {getFallbackText(contact.phone)}
                  </Typography>
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
                        contactStatusCopy[contact.status].className
                      )}
                    >
                      {contactStatusCopy[contact.status].label}
                    </Box>
                    <Typography
                      variant="auxiliary"
                      className="font-normal tracking-normal text-gray-5"
                    >
                      {contactStatusCopy[contact.status].note}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Button
                    type="button"
                    size="fit"
                    variant="outline"
                    className="min-h-9 rounded-xl px-3 py-2"
                    aria-label={`Editar ${contact.name}`}
                    onClick={() => onEdit(contact)}
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
