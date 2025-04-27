import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "./Title.jsx";
import ProductItem from "./ProductItem.jsx";

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="px-4 md:px-10 py-10 bg-white">
      {/* Title and Description */}
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 mt-2">
          Discover our latest collection of stylish and trendy products, curated just for you.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {latestProduct.map((item) => (
          <ProductItem
            key={item._id}
            image={item.image}
            id={item._id}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
