import { cn } from "@/lib/utils";

type Elevation = "flat" | "low" | "medium" | "high";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  elevation?: Elevation;
}

const elevationStyles: Record<Elevation, string> = {
  flat: "bg-white border border-gray-100",
  low: "bg-white shadow-sm",
  medium: "bg-white shadow-md",
  high: "bg-white shadow-lg",
};

export function Card({ children, className, style, onClick, elevation = "low" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5",
        elevationStyles[elevation],
        onClick && "cursor-pointer",
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
