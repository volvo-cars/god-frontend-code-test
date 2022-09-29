import { useSpringCarousel } from "react-spring-carousel";
import { Car } from "../../types/Car";

interface CarouselProps {
  cars: Car[];
}

export const Carousel: React.FC<CarouselProps> = (props) => {
  const { carouselFragment, slideToPrevItem, slideToNextItem } =
    useSpringCarousel({
      itemsPerSlide: 3,
      items: props.cars.map((i) => ({
        id: i.id,
        renderItem: (
          <div>
            <h2>{i.modelName}</h2>
            <img src={i.imageUrl} width={400} height={300}></img>
          </div>
        ),
      })),
    });

  return (
    <div>
      {carouselFragment}
      <button onClick={slideToPrevItem}>Prev item</button>
      <button onClick={slideToNextItem}>Next item</button>
    </div>
  );
};
