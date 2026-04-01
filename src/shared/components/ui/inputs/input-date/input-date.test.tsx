import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputDate } from "./";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";

describe("InputDate Component", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the input with a label", () => {
    render(
      <InputDate
        label="Data"
        placeholder="DD/MM/AAAA"
      />
    );
    expect(screen.getByText("Data")).toBeInTheDocument();
  });

  it("should display the placeholder when no value is selected", () => {
    render(
      <InputDate
        label="Data"
        placeholder="DD/MM/AAAA"
      />
    );
    const button = screen.getByRole("button", { name: /DD\/MM\/AAAA/i });
    expect(button).toBeInTheDocument();
  });

  it("should display the selected date in the correct format", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2025, 8, 1, 0, 0, 0));
    const user = userEvent.setup();

    const ControlledInput = () => {
      const [value, setValue] = useState<Date | undefined>(undefined);
      return (
        <InputDate
          label="Data"
          placeholder="DD/MM/AAAA"
          value={value}
          onChange={date => setValue(date)}
        />
      );
    };

    render(<ControlledInput />);
    const button = screen.getByRole("button", { name: /DD\/MM\/AAAA/i });

    await user.click(button);
    const day = await screen.findByRole("button", { name: /\b15\b/ });
    await user.click(day);

    expect(button).toHaveTextContent("15/09/2025");
  });

  it("should call onChange when a date is selected", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const ControlledInput = () => {
      const [value, setValue] = useState<Date | undefined>(undefined);
      return (
        <InputDate
          label="Data"
          value={value}
          placeholder="DD/MM/AAAA"
          onChange={date => {
            setValue(date);
            handleChange(date);
          }}
        />
      );
    };

    render(<ControlledInput />);
    const button = screen.getByRole("button", { name: /DD\/MM\/AAAA/i });

    await user.click(button);
    const day = await screen.findByRole("button", { name: /\b15\b/ });
    await user.click(day);

    expect(handleChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
