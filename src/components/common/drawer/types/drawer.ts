
import { ReactNode } from "react";

export interface BaseDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export interface DrawerHeaderProps {
  title: string;
}

export interface DrawerContentProps {
  children: ReactNode;
  className?: string;
}
