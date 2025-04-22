import { cva } from "class-variance-authority";

export { default as Label } from "./Label.vue";

export const labelVariants = cva(
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-foreground",
        error: "text-red-500 dark:text-red-500",
        success: "text-green-500 dark:text-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
