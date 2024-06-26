# 계산기

맥 계산기를 참조해 만들어보자.

## 소개

간단한 사칙연산 계산기.

## 작업

- [x] 기본적인 사칙연산(더하기, 빼기, 곱하기, 나누기)을 지원
- [x] 숫자와 연산자를 클릭 혹은 키 입력으로 연산을 수행할 수 있도록 인터페이스를 제공해야 하며, 계산 결과는 화면에 바로 표시
- [x] 지우기 기능을 구현하여 입력한 정보를 삭제 혹은 초기화가 가능
- [x] 사용자가 입력하는 숫자와 연산자는 임의의 길이를 가질 수 있어야 함
- [x] 계산 과정에서 발생할 수 있는 오류(예: 0으로 나누기)에 대해 적절히 처리
- [ ] 괄호를 사용해 계산의 우선순위를 정하기
- [ ] `eval()` 시간이 너무 오래걸리므로 후위 연산을 사용해 성능을 올리자

## 배운점

계산기 서비스의 경우 여러 예외처리를 해주는 것이 어려웠다. 사용자는 다양한 값을 입력함에 따라 이것을 오롯이 화면에 보여주느냐 잘못 입력한 값을 거르느냐가 필요했다. 예를들어 `12.12.12`를 입력하면 `12.1212`로 표기하는 등 대부분의 동작원리를 맥 계산기를 참조했다.

맥 계산기를 그대로 참조하기에는 석연치 않은 점도 있었다. 예를들어 `AC`와 `C`를 번갈아 보여주는 점과 `=`를 중복해 누르면 이전 연산의 결과값과 이전 연산의 연산자가 한번더 적용되는 것을 볼 수 있었다.

테스팅을 돌렸을때 이 서비스의 테스트가 유독 시간을 많이 잡아먹었다. `eval()`에서 문자열을 파싱해 계산값으로 바꾸기 때문일 거라 추정한다.
