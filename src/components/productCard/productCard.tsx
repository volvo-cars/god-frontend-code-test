import Image from "next/image";
import Link from "next/link";

import CarData from "types/cars";

export default function ProductCard(productData: CarData) {
  return (
    <div className="px-8 py-8 snap-start">
      <p className="font-16 text-secondary font-medium uppercase">
        {productData.bodyType}
      </p>
      <h2 className="heading-2">{productData.modelName}</h2>
      <h3 className="heading-4 text-secondary">{productData.modelType}</h3>
      <div className="w-xs">
        <Image
          src={productData.imageUrl}
          width={800}
          height={600}
          alt={`Side view of ${productData.modelName}`}
        />
      </div>
      <div>
        <div className="flex justify-center  gap-8">
          <p>
            <Link className="foo" href={`/learn/${productData.id}`}>
              Learn &gt;
            </Link>
          </p>
          <p>
            <Link href={`/shop/${productData.id}`}>Shop &gt;</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
