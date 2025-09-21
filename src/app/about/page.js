import AppLayout from "@/components/AppLayout";
import AboutPage from "@/components/about/AboutPage";
import Heading from "@/utils/Heading";

export default async function Page() {
  return (
    <AppLayout>
       <Heading
        title="About Foodie's Heaven: Our Culinary Story"
        description="Discover the story behind Foodie's Heaven, where passionate chefs and food lovers come together to celebrate delicious recipes and culinary traditions."
        keywords="about food, foodie community, chefs, cooking journey, culinary traditions"
      />
      <AboutPage />
    </AppLayout>
  );
}
