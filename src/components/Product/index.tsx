import React from "react"
import Link from "next/link"
import {Flex, Row, Col, Text, Link as VCCLink} from "vcc-ui"
import {ProductInterface} from "../../models/Products"

export const Product = ({product, single}: {product: ProductInterface; single?: boolean}) => {
	return (
		<Col size={16}>
			<Row>
				<Text
					subStyle='emphasis'
					extend={{color: "#707070", textTransform: "uppercase", fontSize: "14px !important"}}
					variant='hillary'>
					{product.bodyType}
				</Text>
			</Row>
			<Row>
				<Text subStyle='emphasis' variant='hillary'>
					{product.modelName}
				</Text>
				<Text
					extend={{
						marginLeft: "10px",
						marginBottom: "10px",
						color: "#707070",
						"@media (max-width: 768px)": {
							width: "100%",
							marginLeft: 0
						}
					}}
					variant='hillary'>
					{product.modelType}
				</Text>
			</Row>
			<Row>
				<img src={product.imageUrl} style={{width: "100%", paddingBottom: "10px"}} />
			</Row>
			{!single && (
				<Row>
					<Flex
						extend={{flexDirection: "row", justifyContent: "center", width: "100%", marginBottom: "50px"}}>
						<Link href={`/learn/${product.id}`}>
							<VCCLink style={{marginRight: "20px"}} arrow='right'>
								Learn
							</VCCLink>
						</Link>
						<Link href={`/shop/${product.id}`} as={`/learn/${product.id}`}>
							<VCCLink arrow='right'>Shop</VCCLink>
						</Link>
					</Flex>
				</Row>
			)}
		</Col>
	)
}
