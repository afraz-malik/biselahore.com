import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

const backgroundStyles = {
  default: "bg-background",
  subtle: "bg-secondary/70",
  accent: "bg-gradient-to-b from-accent/60 via-accent/25 to-background",
  brand:
    "bg-surface-brand text-surface-brand-foreground [--border:oklch(1_0_0/12%)]",
  inverted: "bg-foreground text-background",
} as const;

const hasTexture = {
  default: false,
  subtle: true,
  accent: true,
  brand: true,
  inverted: false,
} as const;

interface SectionProps extends React.ComponentProps<"section"> {
  background?: keyof typeof backgroundStyles;
  containerClassName?: string;
}

export function Section({
  className,
  containerClassName,
  background = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-10 md:py-12 lg:py-16",
        backgroundStyles[background],
        className,
      )}
      {...props}
    >
      {hasTexture[background] ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.04] mask-[radial-gradient(ellipse_65%_65%_at_50%_0%,black_30%,transparent_80%)]" />
        </div>
      ) : null}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
