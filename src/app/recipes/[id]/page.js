"use client"

import AppLayout from "@/components/AppLayout";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import { useParams } from "next/navigation";

export default  function Page() {
  const params = useParams();
  const id = params.id;

  return (
    <AppLayout>
      <RecipeDetail id={id} />
    </AppLayout>
  );
}
