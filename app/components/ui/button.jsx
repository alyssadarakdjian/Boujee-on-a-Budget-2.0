<<<<<<< HEAD
import { cn } from '@/lib/utils';
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation"; // Import Next.js Router
import * as React from "react";

=======
<<<<<<<< HEAD:components/ui/button.jsx
import { cn } from '@/lib/utils';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
========
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from 'lib/utils';
>>>>>>>> origin/main:app/components/ui/button.jsx
import * as React from "react";


>>>>>>> origin/main
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
<<<<<<< HEAD
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
=======
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
>>>>>>> origin/main
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
<<<<<<< HEAD
);

// Updated Button component
const Button = React.forwardRef(({ className, variant, size, href, onClick, ...props }, ref) => {
  const router = useRouter();

  // If `href` is provided, navigate using `router.push()`
  const handleClick = (event) => {
    if (onClick) onClick(event); // Allow additional onClick actions
    if (href) router.push(href);
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      onClick={handleClick}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
=======
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants };

>>>>>>> origin/main
