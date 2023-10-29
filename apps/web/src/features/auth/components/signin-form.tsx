import React from "react";
import { Label, Input, Button, Icons } from "ui";
import { FormLayout } from "./form-layout";
import { Link, useNavigate } from "react-router-dom";

interface SignInFormProps { }

export function SignInForm(_props: SignInFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/app");
    }, 3000);
  }

  return (
    <FormLayout>
      <div className="grid gap-6">
        <FormLayout.Headings>
          <FormLayout.Title>Create an account</FormLayout.Title>
          <FormLayout.Subtitle>
            Enter your email below to create your account{" "}
          </FormLayout.Subtitle>
        </FormLayout.Headings>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
            <Link
              to="/login"
              className="underline underline-offset-4 hover:text-primary text-center"
            >
              Already have an account?
            </Link>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <FormLayout.SocialButton
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </FormLayout.SocialButton>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link
          to="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </FormLayout>
  );
}
