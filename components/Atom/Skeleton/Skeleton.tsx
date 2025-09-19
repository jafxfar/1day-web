/**
 * Atom Skeleton
 *
 * Placeholder component used to indicate loading state.
 *
 * @author JX
 */

import { Skeleton as UiSkeleton } from "@heroui/skeleton";

interface Props {
  className?: string;
  isLoaded?: boolean;
  disableAnimation?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Skeleton = (props: Props) => {
  return (
    <UiSkeleton
      className={props.className}
      disableAnimation={props.disableAnimation}
      isLoaded={props.isLoaded}
      style={props.style}
    >
      {props.children}
    </UiSkeleton>
  );
};
