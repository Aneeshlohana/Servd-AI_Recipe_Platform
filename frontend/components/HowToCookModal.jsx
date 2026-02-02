/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HowToCookModal() {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    handleOpenChange(false);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      setRecipeName("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className="transition-colors flex items-center gap-1.5 text-sm font-medium"
          style={{ color: "#57534e" }} // stone-600
        >
          <ChefHat className="w-4 h-4" />
          How to Cook?
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2">
            <ChefHat
              className="w-6 h-6"
              style={{ color: "#ea580c" }} // orange-600
            />
            How to Cook?
          </DialogTitle>
          <DialogDescription>
            Enter any recipe name and our AI chef will guide you through the
            cooking process
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#44403c" }} // stone-700
            >
              What would you like to cook?
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="e.g., Chicken Biryani, Chocolate Cake, Pasta Carbonara"
                className="w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 text-stone-900"
                style={{
                  borderColor: "#e7e5e4", // stone-200
                  color: "#1c1917", // stone-900
                }}
                autoFocus
              />
              <Search
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: "#a8a29e" }} // stone-400
              />
            </div>
          </div>

          <div
            className="rounded-xl p-4 border"
            style={{
              backgroundColor: "#fff7ed", // orange-50
              borderColor: "#ffedd5", // orange-100
            }}
          >
            <h4
              className="text-sm font-semibold mb-2"
              style={{ color: "#7c2d12" }} // orange-900
            >
              💡 Try These:
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Butter Chicken", "Chocolate Brownies", "Caesar Salad"].map(
                (example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setRecipeName(example)}
                    className="px-3 py-1 border rounded-full text-sm transition-colors"
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#c2410c", // orange-700
                      borderColor: "#fed7aa", // orange-200
                    }}
                  >
                    {example}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="ghost"
            disabled={!recipeName.trim()}
            style={{
              backgroundColor: "#ea580c", // orange-600
              color: "#ffffff",
            }}
            className="w-full h-12 hover:opacity-90"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Get Recipe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
