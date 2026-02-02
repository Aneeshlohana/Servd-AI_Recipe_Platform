"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/use-fetch";
import RecipeCard from "@/components/RecipeCard";

export default function RecipeGrid({
  type,
  value,
  fetchAction,
  backLink = "/dashboard",
}) {
  const { loading, data, fn: fetchMeals } = useFetch(fetchAction);

  // Prevent double fetch (Strict Mode)
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!value || hasFetched.current) return;

    hasFetched.current = true;

    const formattedValue = value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    fetchMeals(formattedValue);
  }, [value]);

  const meals = data?.meals ?? [];

  const displayName = value
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div
      className="min-h-screen pt-14 pb-16 px-4"
      style={{ backgroundColor: "#fafaf9" }} // stone-50
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 mb-4"
            style={{ color: "#57534e" }} // stone-600
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <h1
            className="text-5xl md:text-6xl font-bold"
            style={{ color: "#1c1917" }} // stone-900
          >
            {displayName}{" "}
            <span style={{ color: "#ea580c" }}>
              {type === "cuisine" ? "Cuisine" : "Recipes"}
            </span>
          </h1>

          {!loading && meals.length > 0 && (
            <p
              className="mt-2"
              style={{ color: "#57534e" }} // stone-600
            >
              {meals.length} delicious {displayName} recipes to try
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2
              className="w-10 h-10 animate-spin"
              style={{ color: "#ea580c" }} // orange-600
            />
          </div>
        )}

        {/* Grid */}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                recipe={meal}
                variant="grid"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && meals.length === 0 && (
          <div className="text-center py-20">
            <h3
              className="text-2xl font-bold"
              style={{ color: "#1c1917" }} // stone-900
            >
              No recipes found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
