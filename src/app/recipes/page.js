import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import AppLayout from "@/components/AppLayout";
import { redirect } from "next/navigation";
import Recipes from "@/components/recipes/Recipes";
import Heading from "@/utils/Heading";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <AppLayout>
      <Heading
        title="Foodie's Heaven: Explore Delicious Recipes"
        description="Discover mouthwatering recipes at Foodie's Heaven. From quick meals to gourmet dishes, explore a world of flavors and elevate your cooking skills."
        keywords="recipes, cooking, food blog, easy meals, gourmet dishes, home cooking"
      />
      <Recipes session={session} />
    </AppLayout>
  );
}
