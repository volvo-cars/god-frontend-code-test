import { Flex } from 'vcc-ui';
import { Dot } from './Dot';

type PaginationMobilePropsType = {
  scrollProgress: number;
  count: number;
};

const CarouselDots: React.FC<PaginationMobilePropsType> = (props) => {
  const { scrollProgress, count } = props;
  const selectedDotValue = (scrollProgress * count) / 100;

  return (
    <Flex
      extend={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '16px',
        fromM: {
          display: 'none',
        },
      }}
    >
      {[...Array(count).keys()].map((carNumber) => (
        <Dot
          key={carNumber}
          active={
            selectedDotValue >= carNumber && selectedDotValue <= carNumber + 1
          }
        />
      ))}
    </Flex>
  );
};

export default CarouselDots;
