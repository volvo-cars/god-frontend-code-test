import { IconButton } from "@volvo-cars/react-icons";

// TODO: Refactor any
type IndicatorType = {
  indicatorCount: Number;
  activeIndex: Number;
  previousButtonProps: any;
  nextButtonProps: any;
};

export default function ReelIndicator({
  indicatorCount,
  activeIndex,
  previousButtonProps,
  nextButtonProps,
}: IndicatorType) {
  return (
    <section>
      <div className="reel-indicators md:hidden " aria-hidden>
        {[...Array(indicatorCount).keys()].map((_, index) => (
          <div
            key={`indicator_${index}`}
            aria-current={activeIndex === index}
          />
        ))}
      </div>

      <div className="flex gap-x-8 mr-4 md:mr-32 mt-16 until-md:hidden self-end">
        <IconButton
          {...previousButtonProps}
          iconName="navigation-chevronback"
        />
        <IconButton {...nextButtonProps} iconName="navigation-chevronforward" />
      </div>
    </section>
  );
}
