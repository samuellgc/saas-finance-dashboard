import { Button } from "@/shared/components/shadcn/ui/button";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { cn } from "@/shared/lib/utils";
import type { DashboardPeriodKey, DashboardPeriodOption } from "@/modules/dashboard/types/dashboard.types";

type DashboardPeriodFilterProps = {
  options: DashboardPeriodOption[];
  selectedPeriod: DashboardPeriodKey;
  onChange: (period: DashboardPeriodKey) => void;
  disabled?: boolean;
};

export function DashboardPeriodFilter({
  options,
  selectedPeriod,
  onChange,
  disabled = false,
}: DashboardPeriodFilterProps) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 light:border-black/10 light:bg-white/80">
      <legend className="sr-only">Filtrar período do painel</legend>

      {options.map(option => {
        const isSelected = option.value === selectedPeriod;

        return (
          <Button
            key={option.value}
            type="button"
            size="fit"
            variant={isSelected ? "default" : "ghost"}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={cn(
              "min-h-10 rounded-xl px-4 py-2 text-left",
              isSelected
                ? "shadow-sm"
                : "border border-transparent text-gray-6 hover:border-white/10 hover:bg-white/5 light:hover:border-black/10 light:hover:bg-black/5"
            )}
          >
            <Stack
              as="span"
              gap="1"
              className="items-start"
            >
              <Box
                as="span"
                className="text-sm font-semibold"
              >
                {option.label}
              </Box>
              <Box
                as="span"
                className={cn("hidden text-xs md:block", isSelected ? "text-primary-foreground/80" : "text-gray-5")}
              >
                {option.description}
              </Box>
            </Stack>
          </Button>
        );
      })}
    </fieldset>
  );
}
