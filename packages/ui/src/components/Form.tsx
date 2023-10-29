import React from "react";
import { FieldValues, SubmitHandler, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { ZodType, ZodTypeDef } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as FormProvider } from "./ui/form/form";
import clsx from "clsx";


type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const FormWrapper = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({ ...options, resolver: schema && zodResolver(schema) });
  return (
    // <FormProvider {...methods}>
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
    // </FormProvider>
  );
};


