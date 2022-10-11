import { Block } from 'vcc-ui'

type Props = {
  isActive: boolean
  onClick: () => void
}

export const IndexBlock = ({ isActive, onClick }: Props) => {
  return (
    <Block
      style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'black',
        margin: '0 9px',
        opacity: isActive ? 1 : 0.2,
        transition: 'opacity 0.3s',
      }}
      onClick={onClick}
    />
  )
}
