import type { ComponentPropsWithRef } from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogCoreProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Root
>;

export type DialogCoreContentProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Content
>;

export type DialogCoreTitleProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Title
>;

export type DialogCoreDescriptionProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Description
>;

export type DialogCoreCloseProps = ComponentPropsWithRef<
  typeof DialogPrimitive.Close
>;
