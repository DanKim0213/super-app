"use client";
import { OrderItem } from "../type";

type Order = {
  items: OrderItem[];
  handleConfirm: () => void;
  handleDelete: (id: string) => void;
};

function Order({ items, handleConfirm, handleDelete }: Order) {
  const total =
    items.length > 0
      ? items
          .map((item) => item.price * (item.count || 0))
          .reduce((result, a) => result + a)
      : 0;

  return (
    <section className="fixed right-0">
      <h2>주문내역</h2>
      <table>
        <thead>
          <tr>
            <th>메뉴</th>
            <th>수량</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-white bg-red-600"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <caption className="flex gap-2">
          <span>총합: {total}원</span>
          <button
            onClick={handleConfirm}
            className="px-2 text-white bg-blue-400 rounded-md"
          >
            주문 하기
          </button>
        </caption>
      </table>
    </section>
  );
}

export default Order;
