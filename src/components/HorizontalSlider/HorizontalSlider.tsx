import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme, View } from "vcc-ui";
import { ChevronCircled } from "@Components/svgs";
import PaginationDots from "@Components/PaginationDots";
import useScreenResize from "@Hooks/useScreenResize";

export interface HorizontalSliderProps {
  children: ReactNode;

  /**
   * Each children item must has same width
   */
  itemWidth: number;

  /**
   * Spacing between items
   */
  spacing?: number;
}

export default function HorizontalSlider({
  children,
  itemWidth,
  spacing = 0,
}: HorizontalSliderProps) {
  const { baselineGrid } = useTheme();
  const spacingInPixel = spacing * baselineGrid;

  const itemsCount = Array.isArray(children) ? children.length : 1;

  const sliderRef = useRef<HTMLDivElement>(null);

  const [visibleIndex, setVisibleIndex] = useState<Array<number>>([0]);

  const calVisibleIndex = useCallback(() => {
    const container = sliderRef.current;
    if (!container) {
      return;
    }

    const scrollOffset = container.scrollLeft;
    const clientWidth = container.clientWidth;

    const visibleIndex = [...new Array(itemsCount)]
      .map((_, index) => index)
      .filter((index) => {
        const startX = index * (itemWidth + spacingInPixel);
        const endX = startX + itemWidth;

        return startX >= scrollOffset && endX <= scrollOffset + clientWidth;
      });

    if (visibleIndex.length > 0) {
      setVisibleIndex(visibleIndex);
    }
  }, [itemsCount, itemWidth, spacingInPixel]);

  // If the itemsCount changes causes re-render, calculator the visibleIndex again
  useEffect(() => {
    calVisibleIndex();
  }, [itemsCount, calVisibleIndex]);

  // If the screen size changed, calculator the visibleIndex again
  useScreenResize(calVisibleIndex);

  // children must be multiple items, couldn't be a single item or null
  if (!Array.isArray(children) || itemsCount < 2) {
    console.warn(
      "children must be multiple items, couldn't be a single item or null"
    );

    return <>{children}</>;
  }

  function onHorizontalScroll(_: React.UIEvent<HTMLDivElement>) {
    calVisibleIndex();
  }

  function scrollToPrevious() {
    const ref = sliderRef.current;

    if (ref) {
      ref.scroll({
        behavior: "smooth",
        left: ref.scrollLeft - (itemWidth + spacingInPixel),
      });
    }
  }

  function scrollToNext() {
    const ref = sliderRef.current;

    if (ref) {
      ref.scroll({
        behavior: "smooth",
        left: ref.scrollLeft + (itemWidth + spacingInPixel),
      });
    }
  }

  return (
    <>
      <View
        extend={{
          // Aim to hide the horizontal scroll bar
          overflowY: "hidden",
        }}
      >
        {/* Horizontal scroll container */}
        <View
          ref={sliderRef}
          extend={{
            flexDirection: "row",
            // Aim to hide the horizontal scroll bar
            marginBottom: -20,
            paddingBottom: 20,
            untilL: {
              scrollSnapType: "x mandatory",
              overflowX: "auto",
              scrollPaddingLeft: spacingInPixel,
              paddingLeft: spacingInPixel,
              paddingRight: spacingInPixel,
            },
            fromL: {
              // Disable horizontal scroll, controls scrolling by buttons
              overflowX: "hidden",
            },
          }}
          spacing={spacing}
          onScroll={onHorizontalScroll}
        >
          {children}
        </View>
      </View>

      {/* Pagination dots on mobile only */}
      <View
        extend={{
          alignItems: "center",
          marginTop: 24,
          fromL: {
            display: "none",
          },
        }}
      >
        <PaginationDots total={itemsCount} activeIndex={visibleIndex} />
      </View>

      {/* Move to previous/next buttons, on desktop only */}
      <View
        spacing={2}
        extend={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 32,
          untilL: {
            display: "none",
          },
        }}
      >
        <MoveButton
          onClick={scrollToPrevious}
          label="previous"
          style={{ transform: "rotate(180deg)" }}
          disabled={visibleIndex.includes(0)}
        />
        <MoveButton
          onClick={scrollToNext}
          label="next"
          disabled={visibleIndex.includes(itemsCount - 1)}
        />
      </View>
    </>
  );
}

function MoveButton({
  label,
  onClick,
  style = {},
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  style?: CSSProperties;
}) {
  return (
    <button
      style={{
        lineHeight: 0,
        padding: 2,
        border: "none",
        backgroundColor: "transparent",
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <ChevronCircled
        style={{ width: 40, height: 40 }}
        stroke={disabled ? "#ccc" : "#333"}
      />
    </button>
  );
}
