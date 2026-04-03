"use client";

import { IconBrandGithub } from "@tabler/icons-react";

import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to FullStackSkeleton</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() => {
              void authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
              });
            }}
          >
            <IconBrandGithub />
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
