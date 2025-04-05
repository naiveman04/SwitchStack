
declare module '@/components/ui/collapsible' {
  import * as React from "react";
  import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

  export interface CollapsibleContentProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> {
    open?: boolean;
  }
}
