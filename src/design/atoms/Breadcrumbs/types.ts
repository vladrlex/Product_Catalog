import { BreadcrumbsProps as MUIBreadcrumbsProps } from '@mui/material';

export interface BreadcrumbsProps extends Omit<MUIBreadcrumbsProps, 'children'> {
  routeLabels?: Record<string, string>;
  className?: string;
} 