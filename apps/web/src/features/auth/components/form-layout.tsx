import React, { PropsWithChildren } from "react";
import { Button, ButtonProps } from "ui";

type FormLayoutProps = PropsWithChildren<React.ComponentProps<"section">>;

function Title({
  children,
  ...rest
}: PropsWithChildren<React.ComponentProps<"h1">>) {
  return (
    <h1 className="text-2xl font-semibold tracking-tight" {...rest}>
      {children}
    </h1>
  );
}

function Subtitle({
  children,
  ...rest
}: PropsWithChildren<React.ComponentProps<"p">>) {
  return (
    <p className="text-sm text-muted-foreground" {...rest}>
      {children}
    </p>
  );
}

function SocialButton({ children, ...rest }: PropsWithChildren<ButtonProps>) {
  return <Button {...rest}>{children}</Button>;
}

function Headings({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className="flex flex-col space-y-2 text-center" {...rest}>
      {children}
    </div>
  );
}

export function FormLayout({ children, ...rest }: FormLayoutProps) {
  return (
    <section className="h-full w-full flex bg-slate-100" {...rest}>
      <div className="mx-auto flex flex-col items-center justify-center gap-6">
        {children}
      </div>
    </section>
  );
}

FormLayout.Headings = Headings;
FormLayout.Title = Title;
FormLayout.Subtitle = Subtitle;
FormLayout.SocialButton = SocialButton;
