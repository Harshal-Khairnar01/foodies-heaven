import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AppLayout from "@/components/AppLayout";
import ContactPage from "@/components/contact/ContactPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <AppLayout>
      <ContactPage session={session} />
    </AppLayout>
  );
}
