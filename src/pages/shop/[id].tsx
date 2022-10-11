import { Block, Text } from 'vcc-ui'

import { fetchCar, fetchCarIds } from '../../api/cars'
import { CarType } from '../../types/cars'

type Props = {
  car: CarType
}

const ShopCar = ({ car }: Props) => {
  return (
    <Block style={{ textAlign: 'center' }}>
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
