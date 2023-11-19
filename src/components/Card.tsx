import Image from 'next/image'
import './Card.css'
import { useRouter } from 'next/navigation'

const Card = ({ id, modelName, bodyType, modelType, imageUrl }: ICar) => {
    const router = useRouter()

    return (
        <div className="snap-start p-8 md:p-16 lg:p-32 card-container">
            <span className='heading-3 text-secondary font-medium'>{ bodyType }</span>
            <h2 className='heading-2 md:mb-16 lg:mb-32'>{ modelName } <span className='text-secondary font-light until-md:hidden'>{ modelType }</span></h2>
            <div className='text-secondary font-light md:hidden mb-16'>{ modelType }</div>
            <Image
                alt="A Car"
                className="w-full card-image"
                src={imageUrl}
                width={800}
                height={600}
            />
            <div className="flex flex-wrap gap-x-24 justify-center mt-8 md:mt-16 lg:mt-32">
                <a className="button-text text-accent-blue capitalize heading-3 font-medium" onClick={() => router.push('/learn/' + id)}>
                    Learn
                </a>
                <a className="button-text text-accent-blue capitalize heading-3 font-medium" onClick={() => router.push('/shop/' + id)}>
                    Shop
                </a>
            </div>
        </div>
    )
}

export default Card
