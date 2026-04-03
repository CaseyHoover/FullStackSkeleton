import { redirect } from "next/navigation";

import { getSession } from "@/auth/session";

import { UserList } from "./user-list";

export default async function ImpersonatePage() {
  const session = await getSession();

  if (session?.session.impersonatedBy) {
    redirect("/dashboard");
  }

  return (
    <div className="
      flex flex-1 flex-col gap-6 px-4 py-6
      lg:px-6
    ">
      <div>
        <h1 className="text-2xl font-semibold">Impersonate User</h1>
        <p className="mt-1 text-muted-foreground">
          View the app as another user. Your admin session is preserved.
        </p>
      </div>
      <UserList currentUserId={session?.user.id ?? ""} />
    </div>
  );
}
