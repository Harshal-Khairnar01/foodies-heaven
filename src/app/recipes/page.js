import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import AppLayout from "@/components/AppLayout";
import { redirect } from "next/navigation";
import Recipes from "@/components/recipes/Recipes";

export default async function Page() {
  const session = await getServerSession(authOptions);


  return (
    <AppLayout>
      <Recipes session={session} />
    </AppLayout>
  );
}
