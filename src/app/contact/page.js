import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AppLayout from "@/components/AppLayout";
import ContactPage from "@/components/contact/ContactPage";
import Heading from "@/utils/Heading";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <AppLayout>
       <Heading
        title="Get in Touch with Foodie's Heaven"
        description="Have questions, suggestions, or feedback? Reach out to us! We&apos;d love to hear from you and be a part of your culinary journey."
        keywords="contact us, foodie support, customer service, recipe inquiries, feedback"
      />
      <ContactPage session={session} />
    </AppLayout>
  );
}
