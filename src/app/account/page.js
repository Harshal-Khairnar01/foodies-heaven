import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import Profile from "@/components/account/Profile";
import Header from "@/components/header/Header";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Profile user={session.user} />
    </>
  );
}
