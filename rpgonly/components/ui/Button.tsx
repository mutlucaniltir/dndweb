import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold hover:bg-[var(--color-accent-hover)] shadow-md hover:shadow-lg",
  ghost:
    "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  danger: "bg-[var(--color-red)] text-white hover:opacity-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

type LinkProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
};

type Props = ButtonProps | LinkProps;

export function Button(props: Props) {
  const { variant = "primary", size = "md", children, className } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded font-[family-name:var(--font-cinzel)] tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props as LinkProps;
    if (target === "_blank") {
      return (
        <a
          href={href}
          target="_blank"
          rel={rel ?? "noopener noreferrer nofollow"}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _h, variant: _v, size: _s, className: _c, children: _ch, ...btnRest } = props as ButtonProps;
  return (
    <button className={classes} {...btnRest}>
      {children}
    </button>
  );
}
