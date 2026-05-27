import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "btn-pixel-solid",
  ghost:   "btn-pixel",
  outline: "btn-pixel",
  danger:  "btn-pixel-red",
};

const sizeClasses: Record<Size, string> = {
  sm: "",
  md: "",
  lg: "",
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
  const classes = cn(variantClasses[variant], sizeClasses[size], className);

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
