import React, {useEffect, useState} from "react"
import {Product} from "../../src/components/Product"
import {getProducts} from "../../src/api/Products"
import {ProductInterface} from "../../src/models/Products"

type learnProps = {
	carId: string
}

const learn = ({carId}: learnProps) => {
	const [product, setProduct] = useState<ProductInterface>({
		"id": "xc90-recharge",
		"modelName": "XC90 Recharge",
		"bodyType": "suv",
		"modelType": "plug-in hybrid",
		"imageUrl": "/images/xc90_recharge.jpg"
	})
	console.log(carId)

	useEffect(() => {
		getProducts()
			.then(res => {
				const prod = res.find(car => car.id === carId) 
				if(prod)
					setProduct(prod)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return <Product product={product} single={true}/>
}

export function getServerSideProps(context: { query: { carId: string } }) {
	return {
		props: {carId: context.query.carId}
	}
}

export default learn
