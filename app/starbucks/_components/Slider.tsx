import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Item } from "../type";

function Slider({ items }: { items: Item[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items]);

  useEffect(() => {
    // 3초 간격으로 구간 반복
    const interval = setInterval(nextImage, 3000);

    return () => clearInterval(interval);
  }, [currentImage, nextImage]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center justify-center">
        <button
          onClick={prevImage}
          className="w-10 h-10 text-white rounded-full bg-gray-800/50"
        >
          &lt;
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center justify-center">
        <button
          onClick={nextImage}
          className="w-10 h-10 text-white rounded-full bg-gray-800/50"
        >
          &gt;
        </button>
      </div>
      <div
        data-testid={items[currentImage].id}
        className="flex h-40 mx-auto overflow-hidden bg-starbucks w-36 "
      >
        {items.map((item) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.name}
            width={300}
            height={300}
            className={`transition transform duration-300`}
            style={{
              transform: `translateX(calc(${currentImage} * -100%))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
