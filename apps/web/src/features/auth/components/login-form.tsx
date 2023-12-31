import React from "react";
import { toast } from "sonner";
import { FormLayout } from "./form-layout";
import { Button, Icons, Input, Label } from "ui";
import { Form, Link, useNavigation } from "react-router-dom";

interface LoginFormProps { }

export function LoginForm(_props: LoginFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <FormLayout>
      <div className="grid gap-6">
        <FormLayout.Headings>
          <FormLayout.Title>Login to your account</FormLayout.Title>
          <FormLayout.Subtitle>
            Enter your email below to access your account{" "}
          </FormLayout.Subtitle>
        </FormLayout.Headings>
        <Form id="login" method="post" replace>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isSubmitting}
                title="Please enter your email address"
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting}
              />
            </div>
            <Button disabled={isSubmitting}>
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
            <Link
              to="/signin"
              className="underline underline-offset-4 hover:text-primary text-center"
            >
              Dont have an account?
            </Link>
          </div>
        </Form>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </FormLayout.SocialButton>
      </div>
    </FormLayout>
  );
}
