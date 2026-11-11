import type { ComponentPropsWithRef } from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogCoreProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Root
>;

export interface DialogCoreContentProps extends ComponentPropsWithRef<
  typeof DialogPrimitive.Content
> {
  /** Dims the page behind the dialog; off for full-screen dialogs that cover it. */
  overlay?: boolean;
}

export type DialogCoreTitleProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Title
>;

export type DialogCoreDescriptionProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Description
>;

export type DialogCoreCloseProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Close
>;
