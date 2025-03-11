import { FormSchema } from "@/schemas/FormSchema";
import React, { ReactNode } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormProps {
  name: keyof z.infer<typeof FormSchema>;
  control: Control<z.infer<typeof FormSchema>> | undefined;
  formLabel: string;
  className: string;
  description?: string;
  render: (props: { field: any }) => ReactNode;
}

const CustomFormField = ({
  name,
  control,
  formLabel,
  className,
  render,
  description,
}: FormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && (
            <FormLabel className="font-semibold">{formLabel}</FormLabel>
          )}
          <FormControl>{render({ field })}</FormControl>
          <FormDescription className="text-xs font-medium">
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomFormField;
