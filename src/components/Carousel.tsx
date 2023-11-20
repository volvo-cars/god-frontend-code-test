import { useCallback, useEffect, useRef, useState } from "react"
import Card from "./Card"
import Image from "next/image"
import chevronCircled from '../../docs/chevron-circled.svg'
import './Carousel.css'

interface ICarousel {
    cars: ICar[]
}

const Carousel = ({ cars }: ICarousel) => {
    const [centeredCardIndex, setCenteredCardIndex] = useState(0)

    const carouselRef = useRef<HTMLDivElement>(null)
    const innerCarouselRef = useRef<HTMLDivElement>(null)

    const handleScroll = useCallback(() => {
        if (innerCarouselRef.current && carouselRef.current) {
            const visibleWidth = carouselRef.current.offsetWidth
            const totalWidth = innerCarouselRef.current.scrollWidth
            const scrollableWidth = totalWidth - visibleWidth
            const cardScrollableWidth = scrollableWidth / (cars.length - 1)
            const newCenteredIndex = Math.round(innerCarouselRef.current.scrollLeft / cardScrollableWidth)
      
            setCenteredCardIndex(Math.max(Math.min(newCenteredIndex, cars.length - 1), 0))
        }
    }, [cars])

    useEffect(() => {
        let innerCarouselRefValue: HTMLDivElement | undefined = undefined

        if (innerCarouselRef.current) {
            innerCarouselRef.current.addEventListener("scroll", handleScroll)
            innerCarouselRefValue = innerCarouselRef.current
        }
      
        return () => {
            if (innerCarouselRefValue) {
                innerCarouselRefValue.removeEventListener("scroll", handleScroll)
            }
        }
    }, [handleScroll])

    const carouselScroll = (direction: number) => {
        const scrollAmount = (innerCarouselRef?.current?.scrollWidth ?? 0) / cars.length
        innerCarouselRef?.current?.scrollBy({
            behavior: 'smooth',
            left: direction > 0 ? scrollAmount : -scrollAmount
        })
    }

    return (
        <div ref={carouselRef} aria-label="Car models" aria-roledescription="carousel" role="region">
            <div
                ref={innerCarouselRef}
                className="reel gap-x-8 md:gap-x-16 lg:gap-32 scrollbar-none"
            >
                {cars.map(car => <Card key={car.id} {...car} />)}
            </div>
            <div className="reel-indicators md:hidden" aria-hidden>
                {cars.map((_, index) => (
                    <div key={index} aria-current={index === centeredCardIndex ? 'true' : 'false'} />
                ))}
            </div>
            <div className="flex gap-x-8 mt-16 lg:mt-32 until-md:hidden p-16 lg:p-32 justify-end">
                <button type="button" aria-label="Scroll left">
                    <Image
                        className="rotate-180 scroll-button-icon"
                        src={chevronCircled}
                        alt="scroll left image"
                        onClick={() => carouselScroll(-1)}
                    />
                </button>
                <button type="button" aria-label="Scroll right">
                    <Image
                        className="scroll-button-icon"
                        src={chevronCircled}
                        alt="scroll right image"
                        onClick={() => carouselScroll(1)}
                    />
                </button>
            </div>
        </div>
    )
}

export default Carousel
