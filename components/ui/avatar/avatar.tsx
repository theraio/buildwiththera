import AvatarCore from "./avatar-core";
import { AvatarProps } from "./types";
import { avatarVariants } from "./constants";
import { cn } from "~/utils/cn";

function Avatar({
  src,
  alt,
  fallback,
  fallbackClassName,
  size,
  className,
  ...props
}: AvatarProps) {
  return (
    <AvatarCore className={cn(avatarVariants({ size, className }))} {...props}>
      {src && <AvatarCore.Image src={src} alt={alt} />}
      <AvatarCore.Fallback className={fallbackClassName}>
        {fallback}
      </AvatarCore.Fallback>
    </AvatarCore>
  );
}

export default Avatar;
