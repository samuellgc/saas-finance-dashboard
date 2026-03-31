import type { CashFlowSectionProps } from "@/modules/cash-flow/types/cash-flow.types";
import { Card } from "@/shared/components/shadcn/ui/card";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";

export function CashFlowSection({
  headingId,
  title,
  description,
  aside,
  children,
  cardClassName,
}: CashFlowSectionProps) {
  return (
    <Box
      as="section"
      aria-labelledby={headingId}
    >
      <Card className={cn("border border-white/10 bg-card/90 p-6 light:border-black/10", cardClassName)}>
        <Stack gap="6">
          <Stack
            gap="4"
            className="md:flex-row md:items-start md:justify-between"
          >
            <Stack
              gap="2"
              className="min-w-0"
            >
              <Box
                as="h3"
                id={headingId}
                className="text-lg font-semibold text-gray-7"
              >
                {title}
              </Box>

              {typeof description === "string" ? (
                <Typography className="max-w-2xl font-normal leading-6 text-gray-6">{description}</Typography>
              ) : (
                description
              )}
            </Stack>

            {aside ? <Box className="shrink-0">{aside}</Box> : null}
          </Stack>

          {children}
        </Stack>
      </Card>
    </Box>
  );
}
