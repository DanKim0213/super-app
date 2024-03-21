"use client";
/* eslint-disable no-eval */
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";

type CalcOperand =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | ".";
type CalcOperator = "+" | "-" | "*" | "/";
type CalcKey = "Enter" | "Backspace";
type CalcValue = CalcOperand | CalcOperator | CalcKey;

function CalculatorApp() {
  const [pressedOperator, setPressedOperator] = useState("");
  const [values, setValues] = useState<CalcValue[]>([]);
  const [monitor, setMonitor] = useState<"Not a Number" | number>(0);
  const isFloatNumber = values.includes(".");

  const valueHandler = (command: string) => {
    switch (command) {
      case "Enter":
      case "=":
        const copiedValues = [...values];
        if ("+-*/".includes(copiedValues[copiedValues.length - 1])) {
          copiedValues.pop();
        }

        const expression = copiedValues.join("");
        if (expression.includes("/0")) {
          setMonitor("Not a Number");
        } else if (!expression) {
          setMonitor(0);
        } else if (expression.length === 1 && "+-*/".includes(expression[0])) {
          setMonitor(0);
        } else if (expression.length > 1 && "*/".includes(expression[0])) {
          let slicedExpression = "0";
          for (let i = 1; i < expression.length; i++) {
            if ("+-*/".includes(expression[i])) {
              slicedExpression = expression.slice(i + 1);
            }
          }

          setMonitor(eval(slicedExpression));
        } else {
          setMonitor(eval(expression));
        }
        setPressedOperator("");
        setValues([]);
        break;
      case "AC":
        setMonitor(0);
        setPressedOperator("");
        setValues([]);
        break;
      case "Backspace":
      case "C":
        setMonitor(0);
        setValues((prev) => {
          const newValues = [...prev];
          const lastVal = newValues[newValues.length - 1];
          const operands = "1234567890.";
          const operators = "+-*/";

          let isValid;
          if (operands.includes(lastVal)) {
            isValid = (val: string) => !operands.includes(val);
          } else {
            isValid = (val: string) => !operators.includes(val);
            setPressedOperator("");
          }
          for (let i = newValues.length - 1; i >= 0; i--) {
            if (isValid(newValues[i])) break;
            newValues.pop();
          }

          return newValues;
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        setPressedOperator(command);
        setValues((prev) => {
          const lastVal = values[values.length - 1];
          if ("+-*/".includes(lastVal)) prev.pop();
          return [...prev, command];
        });
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case ".":
        if (command === "." && isFloatNumber) {
          break;
        }

        if (command === "0" && values.length === 0) {
          break;
        }

        const arr = [command];
        for (let i = values.length - 1; i >= 0; i--) {
          if (!"1234567890.".includes(values[i])) break;
          arr.push(values[i] as CalcOperand);
        }

        const result = arr.reverse().join("");
        if (result !== ".") setMonitor(eval(result));
        setValues((prev) => [...prev, command]);
        break;
      default:
        break;
    }
  };

  const onClickHandler = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if ("textContent" in e.target) valueHandler(e.target.textContent as string);
  };

  const onKeyHandler = (e: KeyboardEvent) => {
    valueHandler(e.key);
  };

  return (
    <main>
      <h1 className="text-2xl font-bold text-center">계산기</h1>
      <div className="grid max-w-2xl grid-cols-4 gap-1 mx-auto">
        <input
          type="text"
          className="col-span-4 px-2 py-4 text-xl text-white text-end bg-neutral-800"
          value={monitor}
          onKeyDown={onKeyHandler}
          placeholder="0"
          readOnly
        />
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-600"
        >
          AC
        </button>
        <button
          onClick={onClickHandler}
          className="col-span-2 text-center text-white bg-neutral-600"
        >
          C
        </button>
        <button
          aria-pressed={"/" === pressedOperator}
          onClick={onClickHandler}
          className="text-center text-white hover:ring-2 aria-pressed:ring-2 bg-amber-400 border-neutral-800"
        >
          /
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          7
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          8
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          9
        </button>
        <button
          aria-pressed={"*" === pressedOperator}
          onClick={onClickHandler}
          className="text-center text-white hover:ring-2 aria-pressed:ring-2 bg-amber-400 border-neutral-800"
        >
          *
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          4
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          5
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          6
        </button>
        <button
          aria-pressed={"-" === pressedOperator}
          onClick={onClickHandler}
          className="text-center text-white hover:ring-2 aria-pressed:ring-2 bg-amber-400 border-neutral-800"
        >
          -
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          1
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          2
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          3
        </button>
        <button
          aria-pressed={"+" === pressedOperator}
          onClick={onClickHandler}
          className="text-center text-white hover:ring-2 aria-pressed:ring-2 bg-amber-400 border-neutral-800"
        >
          +
        </button>
        <button
          onClick={onClickHandler}
          className="col-span-2 text-center text-white bg-neutral-400"
        >
          0
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white bg-neutral-400"
        >
          .
        </button>
        <button
          onClick={onClickHandler}
          className="text-center text-white hover:ring-2 aria-pressed:ring-2 bg-amber-400"
        >
          =
        </button>
      </div>
    </main>
  );
}

export default CalculatorApp;
