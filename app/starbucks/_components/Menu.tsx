"use client";
import { ChangeEvent, useState } from "react";
import { OrderItem, Item } from "../type";
import Image from "next/image";
import Slider from "./Slider";

type Menu = {
  items: Item[];
  handleOrder: (items: OrderItem[]) => void;
  handleCancel: () => void;
};

function Menu({ items, handleOrder, handleCancel }: Menu) {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  // console.log("selected items: ", selectedItems);

  const onSelect = (event: ChangeEvent<HTMLSelectElement>, newItem: Item) => {
    const newItemCount = parseInt(event.target.value);
    if (newItemCount === 0) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== newItem.id));
      return;
    }

    setSelectedItems((prev) => {
      const newSelectedItems = [...prev];

      // 기존 아이템이 있다면 찾아서 추가; 없다면 새롭게 추가
      let isNew = true;
      for (let j = 0; j < newSelectedItems.length; j++) {
        if (newItem.id === newSelectedItems[j].id) {
          newSelectedItems[j].count = parseInt(event.target.value);
          isNew = false;
          break;
        }
      }

      if (isNew)
        newSelectedItems.push({
          ...newItem,
          count: parseInt(event.target.value),
        });

      return newSelectedItems;
    });
  };

  const onOrder = () => {
    handleOrder(selectedItems);
    setSelectedItems([]);
  };

  const onCancel = () => {
    handleCancel();
    setSelectedItems([]);
  };

  return (
    <section>
      <Slider items={items} />
      <ul className="grid grid-cols-3 gap-10 ">
        {items?.map((item) => (
          <li key={item.id} className="text-center">
            <label htmlFor={item.id} className="flex flex-col items-center">
              <Image width={300} height={300} src={item.src} alt={item.name} />
              {item.name} {item.price} 원
              <select
                className=""
                name="count"
                id={item.id}
                onChange={(e) => onSelect(e, item)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4">
        <button onClick={onOrder} className="px-2 py-1 border ">
          주문 추가
        </button>
        <button
          onClick={onCancel}
          className="px-2 py-1 text-white bg-red-600 border"
        >
          취소하기
        </button>
      </div>
    </section>
  );
}

export default Menu;
