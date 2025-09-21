import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DashboardPage from "@/components/dashboard/DashboardPage";
import AppLayout from "@/components/AppLayout";
import { redirect } from "next/navigation";
import Heading from "@/utils/Heading";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <AppLayout>
      <Heading
        title="Foodies Heaven: Best Recipes & Cooking Community"
        description="Foodies Heaven : From Kitchen Creations to Heartfelt Traditions|| Discover delicious recipes, cooking tips, and a vibrant foodie community at Foodies Heaven. Explore flavors and elevate your culinary skills today! || The ultimate destination for culinary enthusiasts and home chefs. Ignite your passion for cooking and explore a world of flavors curated just for you. Join our vibrant community to share, create, and savor unforgettable recipes. Experience the joy of cooking like never before at Foodies' Heaven."
        keywords="recipes, cooking, food blog, home chefs, culinary tips, foodies, delicious dishes, kitchen"
      />
      <DashboardPage session={session} />
    </AppLayout>
  );
}
