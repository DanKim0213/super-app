import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import CalculatorApp from "../page";

describe("계산기 테스트", () => {
  it("숫자 누르기", async () => {
    const examples = ["2134", "1.34", ".56", "0.78", "123.", "12.12.12", "03"];
    const answers = ["2134", "1.34", "0.56", "0.78", "123", "12.1212", "3"];
    expect.assertions(examples.length);
    render(<CalculatorApp />);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const answer = answers[i];
      for (let j = 0; j < examples[i].length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
      await userEvent.click(screen.getByRole("button", { name: "AC" }));
    }
  });

  it("지우기", async () => {
    const examples = ["3C", "12C", "1+3C4=", "1+C=", "1+2CC-3="];
    const answers = ["0", "0", "5", "1", "-2"];
    render(<CalculatorApp />);
    expect.assertions(examples.length);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const answer = answers[i];
      for (let j = 0; j < examples[i].length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
      await userEvent.click(screen.getByRole("button", { name: "AC" }));
    }
  });

  it("사칙연산 누른 뒤 연산결과는 0", async () => {
    const examples = ["=", "+=", "-=", "*=", "/=", "+-=", "+*=", "*-=", "/*="];
    const answer = "0";
    expect.assertions(examples.length);
    render(<CalculatorApp />);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];

      for (let j = 0; j < example.length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
    }
  });

  it("Not a Number", async () => {
    render(<CalculatorApp />);

    await userEvent.click(screen.getByRole("button", { name: "2" }));
    await userEvent.click(screen.getByRole("button", { name: "/" }));
    await userEvent.click(screen.getByRole("button", { name: "0" }));
    await userEvent.click(screen.getByRole("button", { name: "=" }));
    const $result = screen.getByPlaceholderText("0");

    expect($result).toHaveValue("Not a Number");
  });

  it("단일 사칙연산", async () => {
    const examples = [
      "+3=",
      "-3=",
      "*3=",
      "/0=",
      "/3=",
      "3+=",
      "-3-=",
      "3*=",
      "-3/=",
    ];
    const answers = ["3", "-3", "0", "Not a Number", "0", "3", "-3", "3", "-3"];
    expect.assertions(examples.length);
    render(<CalculatorApp />);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const answer = answers[i];

      for (let j = 0; j < example.length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
    }
  });

  it("단순한 사칙연산", async () => {
    const examples = [
      "0+4=",
      "2+4=",
      "2-4=",
      "2*4=",
      "2/4=",
      "2-+4=",
      "2+-4=",
      "2/*4=",
      "2*/4=",
    ];
    const answers = ["4", "6", "-2", "8", "0.5", "6", "-2", "8", "0.5"];

    expect.assertions(examples.length);
    render(<CalculatorApp />);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const answer = answers[i];

      for (let j = 0; j < example.length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
    }
  });

  it("소수 연산", async () => {
    const examples = ["1/3=", "21/44="];
    const answers = [(1 / 3).toString(), (21 / 44).toString()];
    expect.assertions(examples.length);
    render(<CalculatorApp />);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const answer = answers[i];

      for (let j = 0; j < example.length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
    }
  });

  it("복잡한 사칙연산", async () => {
    const examples = [
      "36/12=",
      "0*30+4=",
      "*30+4=",
      "0-48*1=",
      "42/0+1*4=",
      "41+12*4/12+31=",
      "2/*45+3/2=",
    ];
    const answers = [
      "3",
      "4",
      "4",
      "-48",
      "Not a Number",
      "76",
      "91.5",
      "-132.33333333333334",
    ];

    expect.assertions(examples.length);
    render(<CalculatorApp />);

    const $result = screen.getByPlaceholderText("0");
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      const answer = answers[i];

      for (let j = 0; j < example.length; j++) {
        await userEvent.click(screen.getByRole("button", { name: example[j] }));
      }

      expect($result).toHaveValue(answer);
    }
  });
});
