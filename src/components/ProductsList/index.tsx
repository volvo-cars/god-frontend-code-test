import React, {useEffect, useState, useRef} from "react"
import {getProducts} from "../../api/Products"
import {Grid, Row, SelectInput, Col} from "vcc-ui"
import {Product} from "../Product"
import {ProductInterface, BodyType} from "../../models/Products"
// Import Swiper React components
import {Pagination} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import styles from "./button.module.css"

export const ProductsList = () => {
	const [products, setProducts] = useState<ProductInterface[]>([
		{
			id: "xc90-recharge",
			modelName: "XC90 Recharge",
			bodyType: "suv",
			modelType: "plug-in hybrid",
			imageUrl: "/images/xc90_recharge.jpg"
		}
	])
	const [slides, setSlides] = useState(4)
	const [value, setValue] = useState("default")
	const [isMobile, setIsMobile] = useState(false)

	const fetchProducts = (filter: string) => {
		getProducts()
			.then(res => {
				if (filter === "default") {
					setProducts(res)
					setSlides(4)
				} else {
					const results = res.filter(prod => prod.bodyType === filter)
					setProducts(results)
					setSlides(2)
				}
				if (window.innerWidth <= 768) {
					setSlides(1)
					setIsMobile(true)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		fetchProducts("default")
	}, [])

	useEffect(() => {
		fetchProducts(value)
	}, [value])

	const swiperRef = useRef(null)
	const types = ["default", BodyType.Suv, BodyType.Sedan, BodyType.Estate]

	return (
		<Grid>
			<Row>
				<SelectInput value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} className={styles.selectBtn}>
					{types.map(car => (
						<option key={car} value={car}>
							{car === "default" ? "Select" : car}
						</option>
					))}
				</SelectInput>
				<Swiper
					className={styles.swiperStyle}
					ref={swiperRef}
					modules={[Pagination]}
					spaceBetween={10}
					slidesPerView={slides}
					pagination={{clickable: true}}
				>
					{products.map(product => (
						<SwiperSlide key={product.id}>
							<Product product={product} />
						</SwiperSlide>
					))}
				</Swiper>
				{!isMobile && (
					<div className={styles.btnContainer}>
						<div
							id='previousButton'
							className={styles.prevBtn}
							onClick={() => swiperRef.current.swiper.slidePrev()}>
							<img src='./images/chevron-circled.svg' height={100} width={100} />
						</div>
						<div
							id='nextButton'
							className={styles.nextBtn}
							onClick={() => swiperRef.current.swiper.slideNext()}>
							<img src='./images/chevron-circled.svg' height={100} width={100} />
						</div>
					</div>
				)}
			</Row>
		</Grid>
	)
}
