import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const SectionHeading = ({ title, subtitle, className, align = "center" }: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-12 space-y-4",
      align === "center" && "text-center",
      align === "right" && "text-right",
      className
    )}>
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "max-w-2xl text-lg text-slate-600 dark:text-slate-400",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1 w-20 bg-pink-600",
        align === "center" && "mx-auto",
        align === "right" && "ml-auto"
      )} />
    </div>
  );
};

export default SectionHeading;
