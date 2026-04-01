import type { CategorySelectFieldProps } from "@/modules/categories/types/categories.types";
import { Label } from "@/shared/components/shadcn/ui/label";
import { Box } from "@/shared/components/ui/box";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import { cn } from "@/shared/lib/utils";
import { ChevronDown } from "lucide-react";

export function CategorySelectField({
  id,
  label,
  value,
  options,
  placeholder,
  disabled = false,
  errorMessage,
  onChange,
}: CategorySelectFieldProps) {
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
          className={cn(
            "h-11 w-full appearance-none rounded border bg-white/5 px-4 pr-10 text-sm text-gray-7 outline-none transition light:bg-white",
            errorMessage
              ? "border-error hover:border-error focus:border-error"
              : "border-white/10 hover:border-white/20 focus:border-primary light:border-black/10 light:hover:border-black/20"
          )}
        >
          <option value="">{placeholder}</option>

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

      {errorMessage ? (
        <Typography
          variant="auxiliary"
          type="error"
          className="font-normal tracking-normal"
        >
          {errorMessage}
        </Typography>
      ) : null}
    </Stack>
  );
}
