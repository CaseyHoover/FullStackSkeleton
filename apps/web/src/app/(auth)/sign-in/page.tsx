"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/auth/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Welcome to FullStackSkeleton
          </CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setPending(true);
              setError(null);

              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;

              void authClient.signIn
                .email({ email, password })
                .then(({ error: err }) => {
                  if (err) {
                    setError(err.message ?? "Invalid email or password");
                    setPending(false);
                  } else {
                    router.push("/dashboard");
                  }
                });
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={pending}>
              Sign in
            </Button>
          </form>
          <div className="relative my-4 flex items-center">
            <Separator className="flex-1" />
            <span className="px-3 text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>
          <Button
            variant="outline"
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
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-foreground underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
