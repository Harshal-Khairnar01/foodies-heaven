import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.isAdmin) {
    redirect("/");
  }

  return <AdminDashboard />;
}
