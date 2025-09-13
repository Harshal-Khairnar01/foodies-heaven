import AppLayout from "@/components/AppLayout";
import AboutPage from "@/components/about/AboutPage";

export default async function Page() {
  return (
    <AppLayout>
      <AboutPage />
    </AppLayout>
  );
}
