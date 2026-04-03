"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { useCreateDocument } from "@/app/(shell)/dashboard/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const documentTypes = [
  "Cover page",
  "Table of contents",
  "Narrative",
  "Technical content",
  "Legal",
  "Visual",
  "Financial",
  "Research",
  "Planning",
  "Plain language",
];

const reviewers = [
  "Eddie Lake",
  "Jamik Tashpulatov",
  "Maya Johnson",
  "Carlos Rodriguez",
  "Sarah Chen",
  "Raj Patel",
];

export default function QuickCreatePage() {
  const router = useRouter();
  const { createDocument } = useCreateDocument();
  const [pending, setPending] = React.useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const body = {
      header: form.get("header") as string,
      type: form.get("type") as string,
      status: form.get("status") as string,
      target: (form.get("target") as string) || "0",
      limit: (form.get("limit") as string) || "0",
      reviewer: (form.get("reviewer") as string) || "Assign reviewer",
    };

    if (!body.header || !body.type || !body.status) {
      toast.error("Please fill in all required fields");
      return;
    }

    setPending(true);
    try {
      await createDocument(body);
      toast.success("Document created");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to create document");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="
        flex flex-1 flex-col gap-6 px-4 py-6
        lg:px-6
      "
    >
      <div>
        <h1 className="text-2xl font-semibold">Quick Create</h1>
        <p className="mt-1 text-muted-foreground">
          Create a new document section
        </p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              void handleSubmit(e);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="header">Header</Label>
              <Input
                id="header"
                name="header"
                placeholder="Document title"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Process">In Process</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="target">Target</Label>
                <Input id="target" name="target" placeholder="0" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" name="limit" placeholder="0" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select name="reviewer">
                <SelectTrigger id="reviewer">
                  <SelectValue placeholder="Assign reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Assign reviewer">
                    Assign reviewer
                  </SelectItem>
                  {reviewers.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-fit" disabled={pending}>
              {pending ? "Creating..." : "Create Document"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
