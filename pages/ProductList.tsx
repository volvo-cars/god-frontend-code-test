import react, { useEffect, useState } from "react";
import Image from "next/image";
import { Icon, Link } from "vcc-ui";

interface Car {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
}

const ProductList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cars.json");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Latest Recharge Cars</h1>

      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <div className="car-image">
            <Image
              src={car.imageUrl}
              alt={car.modelName}
              width={400}
              height={250}
            />
          </div>
          <div className="car-details">
            <h2>{car.modelName}</h2>
            <p>Body Type: {car.bodyType}</p>
            <p>Model Type: {car.modelType}</p>
            <div className="car-actions">
              <a href={`/learn/${car.id}`}>
                Learn More <Link />
              </a>
              <a href={`/shop/${car.id}`}>
                Shop Now <Icon type="shop-40" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
