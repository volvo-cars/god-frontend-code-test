import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { View } from "vcc-ui";
import { ChevronCircled } from "@Components/svgs";
import PaginationDots from "@Components/PaginationDots";
import { Dimensions } from "@Constants/dimensions";
import useDebounce from "@Hooks/useDebounce";

interface HorizontalSliderProps {
  children: ReactNode;

  /**
   * Used to show how many pagination dots
   */
  childrenCount: number;
}

export default function HorizontalSlider({
  children,
  childrenCount,
}: HorizontalSliderProps) {
  const childWidth =
    Dimensions.vehicleCardWidth + Dimensions.vehicleCardSpacing;

  const sliderRef = useRef<HTMLDivElement>(null);

  const [visibleIndex, setVisibleIndex] = useState<Array<number>>([0]);

  // If the childrenCount changes causes re-render, calculator the visibleIndex again
  useEffect(() => {
    calVisibleIndex();
  }, [childrenCount]);

  function calVisibleIndex() {
    const container = sliderRef.current;
    if (!container) {
      return;
    }

    const scrollOffset = container.scrollLeft;
    const clientWidth = container.clientWidth;

    const visibleIndex = [...new Array(childrenCount)]
      .map((_, index) => index)
      .filter((index) => {
        const startX = index * childWidth;
        const endX = startX + Dimensions.vehicleCardWidth;

        return startX >= scrollOffset && endX <= scrollOffset + clientWidth;
      });

    if (visibleIndex.length > 0) {
      setVisibleIndex(visibleIndex);
    }
  }

  function onHorizontalScroll(event: React.UIEvent<HTMLDivElement>) {
    calVisibleIndex();
  }

  function scrollToPrevious() {
    const ref = sliderRef.current;

    if (ref) {
      ref.scroll({
        behavior: "smooth",
        left: ref.scrollLeft - childWidth,
      });
    }
  }

  function scrollToNext() {
    const ref = sliderRef.current;

    if (ref) {
      ref.scroll({
        behavior: "smooth",
        left: ref.scrollLeft + childWidth,
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
              scrollPaddingLeft: 24,
              paddingLeft: 24,
            },
            fromL: {
              // Disable horizontal scroll, controls scrolling by buttons
              overflowX: "hidden",
            },
          }}
          onScroll={useDebounce(onHorizontalScroll, 10)}
        >
          {children}
        </View>
      </View>

      {childrenCount > 0 && (
        <>
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
            <PaginationDots total={childrenCount} activeIndex={visibleIndex} />
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
              disabled={visibleIndex.includes(childrenCount - 1)}
            />
          </View>
        </>
      )}
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
