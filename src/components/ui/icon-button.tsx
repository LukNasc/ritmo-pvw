import { ComponentPropsWithoutRef } from "react";
import { tv } from "tailwind-variants";

const iconButton = tv({
    base: "flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card",
    variants: {
        disabled: {
            true: "cursor-not-allowed opacity-40 hover:bg-card",
        }
    }
})

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    // Add any additional props you want to support here
};

export function IconButton({ children, disabled, ...restProps }: ButtonProps) {
    return (
        <button className={iconButton({ disabled })} {...restProps}>
            {children}
        </button>
    )
}