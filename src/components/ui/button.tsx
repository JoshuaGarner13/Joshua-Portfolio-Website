import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useRef, useState } from 'react';

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const [ripples, setRipples] = useState<Array<{x: number, y: number, key: number}>>([]);
    const rippleKey = useRef(0);
    const btnRef = useRef<HTMLButtonElement>(null);
    // Sound effect toggle (global, fallback to true)
    const soundEnabled = typeof window !== 'undefined' ? (window.localStorage.getItem('sound') !== 'off') : true;
    const playRippleSound = () => {
      if (!soundEnabled) return;
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const ctx = new window.AudioContext();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = 320;
        g.gain.value = 0.08;
        o.connect(g); g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.12);
        o.onended = () => ctx.close();
      }
    };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setRipples(ripples => [...ripples, { x, y, key: rippleKey.current++ }]);
        playRippleSound();
      }
      if (props.onClick) props.onClick(e);
    };
    if (asChild) {
      // Only render children for Slot, no ripple/shine
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as any}
          {...props}
        >
          {props.children}
        </Slot>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), 'relative overflow-hidden')}
        ref={node => {
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as any).current = node;
          btnRef.current = node;
        }}
        onClick={handleClick}
        {...props}
      >
        {/* Shine effect */}
        <span className="pointer-events-none absolute left-[-75%] top-0 w-[150%] h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="block w-full h-full bg-gradient-to-r from-white/10 via-white/60 to-white/10 blur-[2px] animate-shine" />
        </span>
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <span
            key={ripple.key}
            className="pointer-events-none absolute rounded-full bg-white/40 animate-ripple"
            style={{
              left: ripple.x - 40,
              top: ripple.y - 40,
              width: 80,
              height: 80,
              opacity: 0.7,
            }}
            onAnimationEnd={() => setRipples(ripples => ripples.filter(r => r.key !== ripple.key))}
          />
        ))}
        {props.children}
      </button>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
