import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

const backgroundStyles = {
  default: "bg-background",
  subtle: "bg-secondary/60",
  accent: "bg-accent/60",
  inverted: "bg-foreground text-background",
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
      className={cn("py-20 md:py-28 lg:py-32", backgroundStyles[background], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
