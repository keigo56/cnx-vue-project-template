import { cva } from "class-variance-authority";

export { default as Input } from "./Input.vue";

export const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error:
          "border-red-500 bg-red-50 text-red-900 placeholder:text-red-700 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-900/10 dark:border-red-500 dark:text-red-500 dark:placeholder:text-red-400",
        success:
          "border-green-500 bg-green-50 text-green-900 placeholder:text-green-700 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-500/40 dark:bg-green-900/10 dark:border-green-500 dark:text-green-500 dark:placeholder:text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
