App.js 안에는 useEffect를 사용해서 가짜 데이터를 불러오고,
불러온 데이터를 A 컴포넌트와 B 컴포넌트에 각각 값을 넘깁니다.

A.js는 모든 데이터를 통으로 출력하고 있고,
B.js는 데이터를 분리하여 쪼개서 값을 출력하고 있습니다.

이럴 경우 어떤 컴포넌트가 더 성능이 효율적일지 테스트 하였습니다.

---

### Test Lists

- React Profiler로 성능측정하기
- React.memo를 이용한 성능 최적화
- 얕은 비교 (Shallow Equal)
- useCallback을 이용한 함수 최적화
- useMemo를 이용한 결과 값 최적화

---

### React Profiler로 성능측정하기

첫 번째 "h"를 타이핑 해서 ReRendering을 했을 때 컴포넌트 마다 걸린 시간을
React-Profiler 확장 프로그램을 통해 확인했습니다.
App Component: 14.2ms
A Component: 3.7ms
B Component: 9.3ms

-> 컴포넌트 내부의 기능들을 쪼개었을때가 훨씬 느리게 동작하고 있습니다.

### 1. React.memo를 이용한 성능 최적화

#### 현재 앱에서 B 컴포넌트의 문제점?

-> 현재 앱에서 B 컴포넌트는 B,List,ListItem,Message 컴포넌트로 나뉘어져 있습니다. 이렇게 나눠준 이유는 재사용성을 위해서인 이유도 있지만 각 컴포넌트의 렌더링의 최적화를 위해서이기도 합니다. 예를들어 Input 요소에서 글을 타이핑 할 때 원래는 Message 컴포넌트와 그 State 값을 가지고 있는 App 컴포넌트만 렌더링이 되어야 하는데 현재는 상관이 없는 다른 부분까지 렌더링 되고 있습니다.

이러한 문제점을 React.memo를 사용하여 해결합니다.
App Component: 14.2ms
A Component: 1.5ms
B Component: 0.1ms

성능 최적화 없이 성능을 측정했을때와는 달리 B 컴포넌트가 빠르게 동작합니다.

- **React.memo란?**
  React는 먼저 컴포넌트를 렌더링 한 뒤, 이전에 렌더링 된 결과와 비교하여 DOM 업데이트르 결정합니다. 만약 렌더링 결과가 이전과 다르다면 React는 DOM을 업데이트 합니다.
  위 과정에서 만약 컴포넌트가 React.memo()로 둘러 쌓여 있다면, React는 컴포넌트를 렌더링하고 결과를 [메모이징](https://velog.io/@4775614/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98Memoization%EC%9D%B4%EB%9E%80)(Memoizing) 합니다. 그리고 다음 렌더링이 일어날 때 렌더링하는 컴포넌트의 props가 같다면, React는 메모이징된 내용을 재사용 합니다.
- **React Memo가 Props를 비교하는 방법은?**
  React.memo()는 props혹은 props의 객체를 비교할 때 얕은(Shallow) 비교를 합니다.
- **React Memo Props 비교 방식 수정하기**
  비교 방식을 원하는 대로 수정하고 싶다면 React.meo()의 두 번째 매개변수로 비교함수를 넣으면 됩니다.
  React.memo(Component, [compareFunction(prevProps, nextProps)]);

---

### 2. 얕은 비교(Shallow Compare)

숫자, 문자열 등 원시 자료형은 값을 비교합니다. 배열, 객체 등 참조 자료형은 값 혹은 속성을 비교하지 않고, 참조되는 위치를 비교합니다. 얕은 비교를 사용하게 되는 때는 다음과 같습니다.

1. React.memo()에서 props를 비교할때
2. React Component가 리렌더링을 하기전
   - state변경이 있을 때
   - 부모 컴포넌트가 렌더링 될 때

### 2-1. 깊은 비교(Deep Compare)

---

얕은 비교와 달리 깊은 비교는 객체의 경우에도 값으로 비교합니다. 깊은 비교 방법은 아래와 같습니다.

1. Object depth가 깊지 않은 경우: JSON.stringfy()를 사용
2. Object depth가 깊은 경우: lodash 라이브러리의 isEqual() 사용
