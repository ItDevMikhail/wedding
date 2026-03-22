import { type ReactNode } from "react";

type ParallaxSectionProps = {
  children: ReactNode;
  /** Оставлено для совместимости; параллакс отключён (без framer-motion) */
  offset?: number;
};

export const ParallaxSection = ({ children }: ParallaxSectionProps) => {
  return <div>{children}</div>;
};
