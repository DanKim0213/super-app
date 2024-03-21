import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CafeApp from "../page";
import Slider from "../_components/Slider";
import * as asset from "../../../public/starbucks";

const items = [asset.items[0], asset.items[5]];

describe("키오스크 테스트", () => {
  it("모든 상품은 초기에 수량이 0이다", async () => {
    expect.assertions(items.length);
    render(<CafeApp items={items} />);

    const $selects = screen.getAllByRole("option", { selected: true });

    $selects.forEach(($select) => expect($select).toHaveValue("0"));
  });

  it("메뉴 고르고 취소하기", async () => {
    expect.assertions(items.length);
    render(<CafeApp items={items} />);

    const $item = screen.getByLabelText(/아메리카노/);
    await userEvent.selectOptions($item, "2");
    const $cancel = screen.getByRole("button", { name: /취소/ });
    await userEvent.click($cancel);
    const $selects = screen.getAllByRole("option", { selected: true });

    $selects.forEach(($select) => expect($select).toHaveValue("0"));
  });

  it("상품 수량 선택 후 '주문 추가' 클릭 시 주문 내역에 상품 정보가 추가", async () => {
    render(<CafeApp items={items} />);

    const $item = screen.getByLabelText(/아메리카노/);
    await userEvent.selectOptions($item, "2");
    await userEvent.click(screen.getByRole("button", { name: /추가/ }));
    const $order = screen.getByRole("table");
    const $selects = screen.getAllByRole("option", { selected: true });
    $selects.forEach(($select) => expect($select).toHaveValue("0"));
    const americano = items[1];

    expect($order).toHaveTextContent(
      new RegExp((americano.price * 2).toString())
    );
    expect($order).toHaveTextContent(new RegExp(americano.name));
  });

  it("메뉴 고르고 추가한 다음에 취소하기", async () => {
    render(<CafeApp items={items} />);

    const $item = screen.getByLabelText(/아메리카노/);
    await userEvent.selectOptions($item, "2");
    await userEvent.click(screen.getByRole("button", { name: /추가/ }));
    const $cancel = screen.getByRole("button", { name: /취소/ });
    await userEvent.click($cancel);
    const $order = screen.getByRole("table");

    expect($order).toHaveTextContent(/0/);
    expect($order).not.toHaveTextContent(/아메리카노/);
  });

  it("삭제 시 선택한 상품이 주문내역에서 제외", async () => {
    render(<CafeApp items={items} />);

    const $item = screen.getByLabelText(/아메리카노/);
    await userEvent.selectOptions($item, "2");
    await userEvent.click(screen.getByRole("button", { name: /추가/ }));
    const $delete = screen.getByRole("button", { name: /삭제/ });
    await userEvent.click($delete);
    const $order = screen.getByRole("table");

    expect($order).toHaveTextContent(/0/);
    expect($order).not.toHaveTextContent(/아메리카노/);
  });

  it("주문하기 클릭 시 주문 완료 안내 후 모두 초기화", async () => {
    window.alert = jest.fn();
    render(<CafeApp items={items} />);

    const $item = screen.getByLabelText(/아메리카노/);
    await userEvent.selectOptions($item, "1");
    const $item2 = screen.getByLabelText(/카페라떼/);
    await userEvent.selectOptions($item2, "1");
    await userEvent.click(screen.getByRole("button", { name: /추가/ }));
    const $order = screen.getByRole("table");
    const total = items.map((it) => it.price).reduce((result, a) => result + a);
    expect($order).toHaveTextContent(total.toString());

    const $orderButton = screen.getByRole("button", { name: /주문 하기/ });
    await userEvent.click($orderButton);
    const $selects = screen.getAllByRole("option", { selected: true });

    $selects.forEach(($select) => expect($select).toHaveValue("0"));
    expect($order).toHaveTextContent(/0/);
    expect($order).not.toHaveTextContent(/아메리카노/);
  });
});

describe("슬라이더 테스트", () => {
  it("슬라이더 렌더링", async () => {
    render(<Slider items={asset.items} />);

    const $image = screen.getByTestId(asset.items[0].id);

    expect($image).toBeInTheDocument();
  });

  it("다음 버튼 이동", async () => {
    render(<Slider items={asset.items} />);

    const $image = screen.getByTestId(asset.items[0].id);
    expect($image).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: ">" }));
    const $nextImage = screen.getByTestId(asset.items[1].id);

    expect($nextImage).toBeInTheDocument();
  });

  it("이전 버튼 이동", async () => {
    render(<Slider items={asset.items} />);

    const $image = screen.getByTestId(asset.items[0].id);
    expect($image).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "<" }));
    const $nextImage = screen.getByTestId(
      asset.items[asset.items.length - 1].id
    );

    expect($nextImage).toBeInTheDocument();
  });

  it("3초 간격으로 자동 슬라이드", async () => {
    jest.useFakeTimers();
    render(<Slider items={asset.items} />);

    const $image = screen.getByTestId(asset.items[0].id);
    expect($image).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(3000));
    const $nextImage = screen.getByTestId(asset.items[1].id);

    expect($nextImage).toBeInTheDocument();
  });
});
