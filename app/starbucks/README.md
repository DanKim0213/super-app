# 스타벅스 카페

음료 키오스크 화면을 간단히 구현했다.

## 소개

음료 주문하는 키오스크를 간단히 만들어보았다. 최소 기능 모델(MVP)로 구현했기때문에, 추가로 [프로그래머스의 쇼핑몰 SPA](https://school.programmers.co.kr/skill_check_assignments/199)를 참조해서 화면 수정이 이뤄질 계획이다.

## 작업

키오스크 주문:

- [x] 상품 수량 선택 후 "주문 추가" 클릭 시 주문 내역에 상품 정보가 추가
- [x] 주문내역에는 추가한 각 상품의 상품명, 수량, 가격 정보와 삭제 버튼으로 이루어져 있고, 최상단 혹은 최하단에 최종 결제 금액과 주문하기 버튼이 제공
- [x] 삭제 시 선택한 상품이 주문내역에서 제외되고, 취소 시 선택 중인 상품, 주문내역 등 모두 초기화
- [x] 주문하기 클릭 시 주문 완료 안내 후 모두 초기화
- [x] 주문 추가 후에는 선택한 상품의 수량 등이 초기화
- [x] 이미 주문된 상품을 추가할 경우, 기존 상품에 합하여 표기
- [x] 주문내역은 높이와 위치에 상관없이 항상 고정 노출

슬라이더:

- [x] 이전 및 다음 버튼을 클릭하여 이미지를 전환
- [x] 자동으로 다음 이미지로 이동하는 기능을 포함
- [x] 다음 이미지가 없는 경우, 첫 번째 이미지로 이동
- [ ] 첫 번째 이미지로 순간이동보다 단방향으로 무한 루프

## 배운점

캐러셀 컴포넌트를 외부 라이브러리 없이 만들었다. 덕분에 `transform`에 대해 경험할 수 있었다.

음료 아이템을 고르고 수량을 체크하며 `select` 태그를 어떻게 테스트하는지 경험했다.

`jest not implemented window.alert()` 에러를 접했고, 이를 `window.alert = jest.fn()`으로 해결했다. [Stack overflow](https://stackoverflow.com/questions/55088482/jest-not-implemented-window-alert)에서 참조했다.

`"Syntax Error: Invalid or unexpected token" with .png` 에러를 접했고, 이를 `assetsTransformer.js`에서 해결했다. [Github Jest issue](https://github.com/jestjs/jest/issues/2663#issuecomment-317109798)에서 참조했다.

Nextjs의 Static Assets에 대해 배웠다. `public`폴더 안에 있는 파일들은 `import logo from '/logo.png';`으로 참조해 쓸 수 있다. [Nextjs - Static Assets](https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets)에서 참조했다.

## 에러

- 주문 추가를 하고나서 메뉴에 있는 음료 아이템들의 수량이 초기화되어야한다. 초기화작업은 키 변경을 통해 유도했지만 Nextjs에서는 동작하지 않는다. 이유를 모르겠다. 따로 CRA로 만든 프로젝트에서는 초기화가 잘 동작하는데 말이다.
