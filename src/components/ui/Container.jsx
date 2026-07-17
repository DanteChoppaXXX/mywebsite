import { cn } from "../../utils/cn";

export default function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </Tag>
  );
}
