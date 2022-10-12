import { useRouter } from 'next/router'
import { Block, Button, Text } from 'vcc-ui'

import { fetchCar, fetchCarIds } from '../../api/cars'
import { shopStyles } from '../../pageStyles/shop.styles'
import { CarType } from '../../types/cars'

type Props = {
  car: CarType
}

const ShopCar = ({ car }: Props) => {
  const { push } = useRouter()

  return (
    <Block style={shopStyles.wrapper}>
      <Button onClick={() => push('/')}>Back</Button>
      <Text subStyle='emphasis'>SHOP</Text>
      <Text>{car.modelName}</Text>
    </Block>
  )
}

export async function getStaticPaths() {
  const paths = await fetchCarIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const car = await fetchCar(params.id)

  return {
    props: {
      car,
    },
  }
}

export default ShopCar
