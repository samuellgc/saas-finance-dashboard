import clsx from "clsx";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/shared/components/shadcn/ui/input";
import { Box } from "@/shared/components/ui/box";
import { Grid } from "@/shared/components/ui/grid";
import { Icon } from "@/shared/components/ui/icon";
import { InputWrapper } from "@/shared/components/ui/inputs/input-wrapper";
import { Stack } from "@/shared/components/ui/stack";
import { Typography } from "@/shared/components/ui/typography";
import type { InputWrapperProps } from "@/shared/types/inputs";
import type { TypographyType } from "@/shared/types/typography";

type InputPasswordProps = Omit<InputWrapperProps, "onChange" | "value"> & {
  value?: string;
  onChange?: (value: string) => void;
  showValidation?: boolean;
};

function validatePassword(value: string) {
  const noSequentialNumbersValidation = value.length >= 3 && !/012|123|234|345|456|567|678|789|890/.test(value);
  const noSpacesValidation = value.length > 0 && !/\s/.test(value);
  const rules = {
    minLength: value.length >= 10,
    hasLowercase: /[a-z]/.test(value),
    hasUppercase: /[A-Z]/.test(value),
    hasNumber: /\d/.test(value),
    hasSpecial: /[^A-Za-z0-9]/.test(value),
    noSequentialNumbers: noSequentialNumbersValidation,
    noSpaces: noSpacesValidation,
  };

  const passed = Object.values(rules).filter(Boolean).length;
  const strength = value ? (passed >= 6 ? "Senha forte" : passed >= 4 ? "Senha média" : "Senha fraca") : null;

  return { rules, strength };
}

function getStrengthType(strength: string | null): TypographyType {
  if (strength === "Senha forte") return "success";
  if (strength === "Senha média") return "warning";
  return "error";
}

export function InputPassword({
  showValidation = false,
  value,
  onChange,
  label,
  helperText,
  hasError,
  htmlFor,
  ...props
}: InputPasswordProps) {
  const [visible, setVisible] = useState(false);
  const currentValue = typeof value === "string" ? value : "";
  const { rules, strength } = validatePassword(currentValue);

  const ruleItem = (valid: boolean, text: string) => (
    <Stack
      className="text-sm"
      key={text}
      direction="row"
      alignment="center"
      gap="1"
    >
      {valid ? <CheckCircle className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-error" />}
      <Typography>{text}</Typography>
    </Stack>
  );

  return (
    <Stack>
      <InputWrapper
        rightIcon={
          <Icon onClick={() => setVisible(prev => !prev)}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</Icon>
        }
        helperText={helperText}
        label={label}
        hasError={hasError}
        htmlFor={htmlFor}
        {...props}
      >
        <Input
          id={props.id}
          isWrapped
          type={visible ? "text" : "password"}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          autoComplete="new-password"
          {...props}
        />
      </InputWrapper>

      {showValidation && currentValue && (
        <Stack className="text-sm">
          <Stack gap="1">
            <Box className="relative h-1 w-full overflow-hidden rounded bg-gray-3">
              <Box
                className={clsx("h-full transition-all duration-300", {
                  "w-1/3 bg-error": strength === "Senha fraca",
                  "w-2/3 bg-warning": strength === "Senha média",
                  "w-full bg-success": strength === "Senha forte",
                })}
              />
            </Box>
            <Typography
              className="text-right"
              variant="auxiliary"
              type={getStrengthType(strength)}
            >
              {strength}
            </Typography>
          </Stack>
          <Grid gap="1">
            {ruleItem(rules.minLength, "Mínimo 10 caracteres")}
            {ruleItem(rules.hasLowercase, "1 ou mais minúsculas")}
            {ruleItem(rules.hasUppercase, "1 ou mais maiúsculas")}
            {ruleItem(rules.hasNumber, "1 ou mais numéricos")}
            {ruleItem(rules.hasSpecial, "1 ou mais especiais")}
            {ruleItem(rules.noSequentialNumbers, "Sem sequência numérica")}
            {ruleItem(rules.noSpaces, "Sem espaços")}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
