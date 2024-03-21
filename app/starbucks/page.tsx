"use client";
import { useState } from "react";
import * as asset from "../../public/starbucks";
import Image from "next/image";
import { OrderItem, Item } from "./type";
import Menu from "./_components/Menu";
import Order from "./_components/Order";

type App = {
  items: Item[];
};

function CafeApp({ items = asset.items }: App) {
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [toggleForMenu, setToggleForMenu] = useState(false);

  const handleOrder = (newItems: OrderItem[]) => {
    setSelectedItems((prev) => {
      const newSelectedItems = [...prev];

      // 기존 아이템이 있다면 찾아서 추가; 없다면 새롭게 추가
      for (let i = 0; i < newItems.length; i++) {
        let isNew = true;
        for (let j = 0; j < newSelectedItems.length; j++) {
          if (newItems[i].id === newSelectedItems[j].id) {
            newSelectedItems[j].count += newItems[i].count;
            isNew = false;
            break;
          }
        }

        if (isNew) newSelectedItems.push(newItems[i]);
      }

      setToggleForMenu((prev) => !prev);
      return newSelectedItems;
    });
  };

  const handleCancel = () => {
    setToggleForMenu((prev) => !prev);
    setSelectedItems([]);
  };

  const handleConfirm = () => {
    setSelectedItems([]);
    alert("주문 완료");
  };

  const handleDelete = (id: string) => {
    setSelectedItems((prev) => prev.filter((it) => it.id !== id));
  };

  return (
    <>
      <header className="flex items-center gap-8 p-4 bg-gray-200">
        <Image
          width={60}
          height={60}
          src={asset.logo.src}
          alt={asset.logo.name}
        />
        MENU
      </header>
      <main className="flex justify-between">
        <Menu
          key={`menu-${toggleForMenu}`}
          items={items}
          handleOrder={handleOrder}
          handleCancel={handleCancel}
        />
        <Order
          items={selectedItems}
          handleConfirm={handleConfirm}
          handleDelete={handleDelete}
        />
      </main>
    </>
  );
}

export default CafeApp;
