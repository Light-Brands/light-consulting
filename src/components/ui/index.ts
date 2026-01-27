/**
 * UI Component Library
 * Light Brand Consulting Design System
 * 
 * Central export point for all UI components
 */

// Utilities
export { cn, focusRing, disabledState, transition, getInitials, formatFileSize } from './utils';
export type { PolymorphicProps } from './utils';

// Typography
export {
  Heading,
  Text,
  Label,
  DisplayText,
  Code,
  Blockquote,
} from './Typography';
export type {
  HeadingProps,
  TextProps,
  LabelProps,
  DisplayTextProps,
  CodeProps,
  BlockquoteProps,
} from './Typography';

// Layout
export {
  Container,
  Section,
  Grid,
  Flex,
  Stack,
  Divider,
} from './Container';
export type {
  ContainerProps,
  SectionProps,
  GridProps,
  FlexProps,
  StackProps,
  DividerProps,
} from './Container';

// Form Components
export { Button, IconButton, ButtonGroup } from './Button';
export type { ButtonProps, IconButtonProps, ButtonGroupProps } from './Button';

export { Input, Textarea, Select } from './Input';
export type { InputProps, TextareaProps, SelectProps } from './Input';

// Display Components
export { Card, CardHeader, CardBody, CardFooter, default as CardComponent } from './Card';
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './Card';

export { Badge, DotBadge, NumberBadge } from './Badge';
export type { BadgeProps, DotBadgeProps, NumberBadgeProps } from './Badge';

export { Alert, Toast } from './Alert';
export type { AlertProps, ToastProps } from './Alert';

export { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmDialog } from './Modal';
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ConfirmDialogProps,
} from './Modal';

// Theme/Palette Components
export { PaletteSwitcher } from './PaletteSwitcher';

// Visualization Components
export { MermaidDiagram } from './MermaidDiagram';
