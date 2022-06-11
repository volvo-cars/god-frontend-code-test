import React from "react";
import { Block, useTheme, View } from "vcc-ui";

export interface PaginationDotsProps {
  /**
   * Total count of the dots
   */
  total: number;

  /**
   * which dots is activated
   */
  activeIndex: Array<number>;

  dotSize?: number;
}

export default function PaginationDots({
  total,
  activeIndex,
  dotSize = 8,
}: PaginationDotsProps) {
  const theme = useTheme();

  if (total === 0) {
    return null;
  }

  return (
    <View extend={{ flexDirection: "row" }} spacing={1}>
      {[...new Array(total)].map((_, i) => {
        const backgroundColor = activeIndex.includes(i)
          ? theme.color.foreground.primary
          : theme.color.ornament.divider;

        return (
          <Block
            key={i}
            extend={{
              width: dotSize,
              height: dotSize,
              backgroundColor,
              borderRadius: dotSize * 0.5,
            }}
          />
        );
      })}
    </View>
  );
}
