import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecipeCard({ recipe, variant = "default" }) {
  const getRecipeData = () => {
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      };
    }

    if (recipe.matchPercentage) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        matchPercentage: recipe.matchPercentage,
        missingIngredients: recipe.missingIngredients || [],
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      };
    }

    if (recipe) {
      return {
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        image: recipe.imageUrl,
        href: `/recipe?cook=${encodeURIComponent(recipe.title)}`,
        showImage: !!recipe.imageUrl,
      };
    }

    return {};
  };

  const data = getRecipeData();

  /* ================= GRID ================= */
  if (variant === "grid") {
    return (
      <Link href={data.href}>
        <Card
          className="rounded-none overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group pt-0"
          style={{ borderColor: "#e7e5e4" }}
        >
          {data.showImage ? (
            <div className="relative aspect-square">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />

              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              >
                <div className="absolute bottom-0 p-4">
                  <p style={{ color: "#ffffff", fontSize: "14px" }}>
                    Click to view recipe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="relative aspect-square flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #fb923c, #fbbf24, #fde047)",
              }}
            >
              <ChefHat
                className="w-20 h-20"
                style={{ color: "rgba(255,255,255,0.3)" }}
              />
            </div>
          )}

          <CardHeader>
            <CardTitle
              className="text-lg font-bold transition-colors line-clamp-2"
              style={{ color: "#1c1917" }}
            >
              {data.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }

  /* ================= PANTRY ================= */
  if (variant === "pantry") {
    return (
      <Card
        className="rounded-none hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
        style={{ borderColor: "#e7e5e4" }}
      >
        {data.showImage && (
          <div className="relative aspect-video">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />

            {data.matchPercentage && (
              <div className="absolute top-4 right-4">
                <Badge
                  variant="neutral"
                  className="text-lg px-3 py-1.5 shadow-lg"
                  style={{
                    backgroundColor:
                      data.matchPercentage >= 90
                        ? "#22c55e"
                        : data.matchPercentage >= 75
                        ? "#f59e0b"
                        : "#737373",
                    color: "#ffffff",
                  }}
                >
                  {data.matchPercentage}% Match
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardHeader>
          <CardTitle
            className="text-2xl font-serif font-bold"
            style={{ color: "#1c1917" }}
          >
            {data.title}
          </CardTitle>

          {data.description && (
            <CardDescription style={{ color: "#57534e", marginTop: "8px" }}>
              {data.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {(data.prepTime || data.cookTime || data.servings) && (
            <div
              className="flex gap-4 text-sm"
              style={{ color: "#78716c" }}
            >
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {parseInt(data.prepTime || 0) +
                    parseInt(data.cookTime || 0)}{" "}
                  mins
                </span>
              </div>

              {data.servings && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{data.servings} servings</span>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Link href={data.href} className="w-full">
            <Button
              className="w-full gap-2"
              style={{
                backgroundColor: "#16a34a",
                color: "#ffffff",
              }}
            >
              <ChefHat className="w-4 h-4" />
              View Full Recipe
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return null;
}
