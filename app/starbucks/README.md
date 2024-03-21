# 스타벅스 카페

음료 키오스크 화면을 간단히 구현했다.

## 배운점

- 캐러셀 컴포넌트를 외부 라이브러리 없이 만들었다. 덕분에 `transform`에 대해 경험할 수 있었다.
- 음료 아이템을 고르고 수량을 체크하며 `select` 태그를 어떻게 테스트하는지 경험했다.
- `jest not implemented window.alert()` 에러를 접했고, 이를 `window.alert = jest.fn()`으로 해결했다. [Stack overflow](https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert)에서 참조했다.
- `"Syntax Error: Invalid or unexpected token" with .png` 에러를 접했고, 이를 `assetsTransformer.js`에서 해결했다. [Github Jest issue](https://github.com/jestjs/jest/issues/2663#issuecomment-317109798)에서 참조했다.
- Nextjs의 Static Assets에 대해 배웠다. `public`폴더 안에 있는 파일들은 `import logo from '/logo.png';`으로 참조해 쓸 수 있다. [Nextjs - Static Assets](https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets)에서 참조했다.

## 고쳐야할 점

- 주문 추가를 하고나서 메뉴에 있는 음료 아이템들의 수량이 초기화되어야한다. 초기화작업은 키 변경을 통해 유도했지만 Nextjs에서는 동작하지 않는다. 이유를 모르겠다. 따로 CRA로 만든 프로젝트에서는 초기화가 잘 동작하는데 말이다.
