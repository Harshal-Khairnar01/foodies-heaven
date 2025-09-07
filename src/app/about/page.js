import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import AppLayout from "@/components/AppLayout";
import { redirect } from "next/navigation";
import AboutPage from "@/components/about/AboutPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
    console.log(session)


  return (
    <AppLayout>
      <AboutPage session={session} />
    </AppLayout>
  );
}
