"use client";

import { XIcon } from "~/components/icons";
import SheetCore from "./sheet-core";
import { SheetProps } from "./types";

function Sheet({
  open,
  onOpenChange,
  title,
  description,
  headerEnd,
  children,
  className,
  contentId,
  "data-testid": dataTestId,
}: SheetProps) {
  return (
    <SheetCore open={open} onOpenChange={onOpenChange}>
      <SheetCore.Content
        id={contentId}
        className={className}
        data-testid={dataTestId}
        open={open}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex min-w-0 flex-col gap-1">
              <SheetCore.Title className="text-lg font-semibold text-foreground">
                {title}
              </SheetCore.Title>
              <SheetCore.Description
                className={
                  description ? "text-sm text-muted-foreground" : "sr-only"
                }
              >
                {description ?? title}
              </SheetCore.Description>
            </div>
            {headerEnd}
          </div>
          <SheetCore.Close
            aria-label="Close"
            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <XIcon className="size-4" />
          </SheetCore.Close>
        </div>
        <div className="scrollbar-hide flex-1 overflow-y-auto">{children}</div>
      </SheetCore.Content>
    </SheetCore>
  );
}

export default Sheet;
