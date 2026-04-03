"use client";

import { IconPlus, IconUserCheck } from "@tabler/icons-react";
import * as React from "react";
import { toast } from "sonner";

import { authClient } from "@/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
}

export function UserList({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showCreate, setShowCreate] = React.useState(false);
  const [creating, setCreating] = React.useState(false);

  function loadUsers() {
    authClient.admin
      .listUsers({ query: { limit: 100 } })
      .then((res) => {
        setUsers(res.data.users.filter((u) => u.id !== currentUserId));
      })
      .catch(() => {
        toast.error("Failed to load users");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount
  }, []);

  function handleImpersonate(userId: string) {
    void authClient.admin.impersonateUser({
      userId,
      fetchOptions: {
        onSuccess: () => {
          window.location.assign("/dashboard");
        },
      },
    });
  }

  async function handleCreate(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const role = form.get("role") as string;

    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }

    setCreating(true);
    try {
      await authClient.admin.createUser({ name, email, role });
      toast.success(`Created ${name}`);
      setShowCreate(false);
      loadUsers();
    } catch {
      toast.error("Failed to create user");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-xs"
            onClick={() => {
              setShowCreate(!showCreate);
            }}
          >
            <IconPlus className="size-3.5" />
            Create Test User
          </Button>
        </CardHeader>
        {showCreate && (
          <CardContent className="border-b pb-4">
            <form
              onSubmit={(e) => {
                void handleCreate(e);
              }}
              className="flex flex-col gap-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-xs">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    className="h-8 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor="role" className="text-xs">
                    Role
                  </Label>
                  <Select name="role" defaultValue="user">
                    <SelectTrigger id="role" className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">user</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="h-8"
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        )}
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No other users found. Create a test user above.
            </p>
          ) : (
            <div className="flex flex-col divide-y">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="
                    flex items-center gap-3 py-3
                    first:pt-0
                    last:pb-0
                  "
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg text-xs">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                  <Badge variant="outline">{user.role ?? "user"}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs"
                    onClick={() => {
                      handleImpersonate(user.id);
                    }}
                  >
                    <IconUserCheck className="size-3.5" />
                    Impersonate
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
