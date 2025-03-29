import React, { CSSProperties, PropsWithChildren } from "react"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export type PixelSizeType =
  | `${Digit}${Digit}${Digit}px`
  | `${Digit}${Digit}px`
  | `${Digit}px`

export type Spacing = {
  none: PixelSizeType
  xSmall: PixelSizeType
  small: PixelSizeType
  smedium: PixelSizeType
  medium: PixelSizeType
  xMedium: PixelSizeType
  large: PixelSizeType
  xxLarge: PixelSizeType
}

const spacing: Spacing = {
  none: "0px",
  xSmall: "4px",
  small: "8px",
  smedium: "12px",
  medium: "16px",
  xMedium: "24px",
  large: "32px",
  xxLarge: "40px",
}

export const useSpacing = (key: SpacingKey) => spacing[key]

export type SpacingKey = keyof Spacing

const DEBUG_COLORS: boolean = false

type OptionalSize = "none" | SpacingKey

interface LayoutCommonProps {
  padding?: OptionalSize
  paddingVertical?: OptionalSize
  paddingHorizontal?: OptionalSize
  paddingBottom?: OptionalSize
  paddingTop?: OptionalSize
  paddingRight?: OptionalSize
  paddingLeft?: OptionalSize
  id?: string
  gap?: OptionalSize
  horizontal?: boolean
  justifyContent?: CSSProperties["justifyContent"]
  alignItems?: CSSProperties["alignItems"]
}

interface LayoutGrowProps extends LayoutCommonProps {
  grow?: boolean
  fullHeight?: never
  fullWidth?: never
}

interface LayoutWidthAndHeightProps extends LayoutCommonProps {
  grow?: never
  fullHeight?: boolean
  fullWidth?: boolean
}

export type LayoutProps = LayoutGrowProps | LayoutWidthAndHeightProps

export const Layout: React.FC<LayoutProps & PropsWithChildren> = ({
  padding = "none",
  paddingVertical,
  paddingHorizontal,
  paddingBottom,
  paddingTop,
  paddingRight,
  paddingLeft,
  gap,
  horizontal = false,
  children,
  grow = false,
  fullHeight = false,
  fullWidth = false,
  justifyContent = "flex-start",
  alignItems,
  id,
  ...rest
}) => {
  const paddingBottomValue = useSpacing(
    paddingBottom || paddingVertical || padding
  )
  const paddingTopValue = useSpacing(paddingTop || paddingVertical || padding)
  const paddingRightValue = useSpacing(
    paddingRight || paddingHorizontal || padding
  )
  const paddingLeftValue = useSpacing(
    paddingLeft || paddingHorizontal || padding
  )
  const gapValue = gap ? useSpacing(gap) : undefined

  const style: React.CSSProperties = {
    paddingBottom: paddingBottomValue,
    paddingTop: paddingTopValue,
    paddingRight: paddingRightValue,
    paddingLeft: paddingLeftValue,
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    flex: grow ? 1 : 0,
    gap: gapValue,
    width: fullWidth || (horizontal && grow) ? "100%" : undefined,
    height: fullHeight || (!horizontal && grow) ? "100%" : undefined,
    justifyContent,
    alignItems: alignItems || (grow ? "stretch" : "flex-start"),
    backgroundColor: DEBUG_COLORS ? getDebugColor() : undefined,
    boxSizing: "border-box",
  }

  return (
    <div id={id} style={style} {...rest}>
      {children}
    </div>
  )
}

const getDebugColor = () => {
  let color = Math.floor(Math.random() * 0xffffff).toString(16)

  while (color.length < 6) {
    color = "0" + color
  }

  return "#" + color
}
