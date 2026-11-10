import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
  AvatarCoreFallbackProps,
  AvatarCoreImageProps,
  AvatarCoreProps,
} from "./types";
import { cn } from "~/utils/cn";
import { createNamespaceComponent } from "~/utils/create-namespace-component";

function AvatarCore({ className, ...props }: AvatarCoreProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarCoreImage({ className, ...props }: AvatarCoreImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarCoreFallback({ className, ...props }: AvatarCoreFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export default createNamespaceComponent(AvatarCore, {
  Image: AvatarCoreImage,
  Fallback: AvatarCoreFallback,
});
