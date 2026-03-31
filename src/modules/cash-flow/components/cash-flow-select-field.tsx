import { ChevronDown } from "lucide-react";
import type { CashFlowSelectFieldProps } from "@/modules/cash-flow/types/cash-flow.types";
import { Label } from "@/shared/components/shadcn/ui/label";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";

export function CashFlowSelectField({
  id,
  label,
  value,
  options,
  disabled = false,
  onChange,
}: CashFlowSelectFieldProps) {
  return (
    <Stack gap="2">
      <Label htmlFor={id}>{label}</Label>

      <Box className="relative">
        <Box
          as="select"
          id={id}
          value={value}
          disabled={disabled}
          onChange={event => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded border border-white/10 bg-white/5 px-4 pr-10 text-sm text-gray-7 outline-none transition hover:border-white/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 light:border-black/10 light:bg-white light:hover:border-black/20"
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Box>

        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-5"
          aria-hidden="true"
        />
      </Box>
    </Stack>
  );
}
