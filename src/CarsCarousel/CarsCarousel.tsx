import { CurrentTheme, ExtendPropValue, Flex } from 'vcc-ui';

type CarsCarouselPropsType = {
  target: React.RefObject<HTMLDivElement>;
  extend?: ExtendPropValue<CurrentTheme, {}>;
};

const CarsCarousel: React.FC<CarsCarouselPropsType> = (props) => {
  const { target, extend } = props;
  return (
    <Flex
      extend={{
        flexDirection: 'row',
        overflow: 'auto',
        fromM: {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        ...extend,
      }}
      ref={target}
    >
      {props.children}
    </Flex>
  );
};

export default CarsCarousel;
