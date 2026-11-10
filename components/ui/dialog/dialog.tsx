"use client";

import { XIcon } from "~/components/icons";
import DialogCore from "./dialog-core";
import { DialogProps } from "./types";

function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  "data-testid": dataTestId,
}: DialogProps) {
  return (
    <DialogCore open={open} onOpenChange={onOpenChange}>
      <DialogCore.Content className={className} data-testid={dataTestId}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <DialogCore.Title className="text-lg font-semibold text-foreground">
              {title}
            </DialogCore.Title>
            <DialogCore.Description
              className={
                description ? "text-sm text-muted-foreground" : "sr-only"
              }
            >
              {description ?? title}
            </DialogCore.Description>
          </div>
          <DialogCore.Close
            aria-label="Close"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <XIcon className="size-4" />
          </DialogCore.Close>
        </div>
        {children}
      </DialogCore.Content>
    </DialogCore>
  );
}

export default Dialog;
