# Todo

[MDN의 Todo](https://mdn.github.io/todo-react/)를 참조했다.

## 소개

슈퍼앱에서 처음으로 만든 서비스이다. 소요시간은 일주일 (테스트를 배우며 준비하는데 5일 + 스타일 변경에 1일 + 테스트에 타입스크립트를 설정하는 과정에서 1일) 걸렸다.

## 작업

- [x] 테스트를 추가
- [x] tailwindcss로 리모델링
- [x] MDN 튜토리얼에서 명시한 대로 입력란에 내용이 비어있다면 추가할 수 없도록 했다.
- [x] 완료된 투두는 진행 중인 투두 아래로 내렸다.
- [x] 모바일 화면에 맞춰 필터 컴포넌트를 스위치로 변경
- [x] 빈 칸일때 투두를 추가할 수 없도록 수정
- [x] [Edit], [Delete] 버튼을 모바일화면에 맞게 수정하였다.
- [ ] 모바일 화면에서 [Edit], [Delete] 버튼을 드래그로 표현하기

## 배운 점

매 프로젝트별 node_modules를 설치하고 싶지않아 Yarn을 도입했다. Yarn을 사용할때 처음에 React 모듈을 찾을 수 없다는 에러를 보고 헤맸지만 공식 사이트에서 vscode에 맞춰 처리를 한번더 해야함을 배웠다.

투두앱의 테스트 코드는 슈퍼앱을 만들기 전부터 준비했었다. 그러나 오직 자바스크립트만으로 준비했기때문에 타입스크립트 환경에서 몇가지 에러를 마주했다. 첫째, [모킹했을때 컴포넌트에 대한 타입을 따로 선언해야한다.](https://jestjs.io/docs/mock-function-api#jestmockedsource-options) 둘째, ~~컴포넌트 코드를 변환해주는 babel에서 ts-jest로 바꿔줘야했다.~~ 별도로 `ts-jest` 모듈을 설치할 필요없이 [`next/jest.js`를 받아와 사용하면 된다.](https://nextjs.org/docs/app/building-your-application/testing/jest)

추가로, [expect.objectContaining() 이라는 추상적으로 테스팅하는 코드](https://jestjs.io/docs/expect#asymmetric-matchers)에 대해서도 알게됐다. 이는 기존에 props로 넘어오던 애를 JSON.stringify()를 통해 문자형으로 변환해 테스팅했었는데 이것보다 추상적 테스팅이 더 정확하면서도 추상적임을 배울 수 있었다. 위기는 곧 기회라고 테스팅에 대해 더 배울 수 있었다.

Input 체크박스를 커스텀하며 css에 대한 지식을 배웠다.
