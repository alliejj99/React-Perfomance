App.js 안에는 useEffect를 사용해서 가짜 데이터를 불러오고,
불러온 데이터를 A 컴포넌트와 B 컴포넌트에 각각 값을 넘깁니다.

A.js는 모든 데이터를 통으로 출력하고 있고,
B.js는 데이터를 분리하여 쪼개서 값을 출력하고 있습니다.

이럴 경우 어떤 컴포넌트가 더 성능이 효율적일지 테스트 하였습니다.

### Test Lists

- React Profiler로 성능측정하기
- React.memo를 이용한 성능 최적화
- 얕은 비교 (Shallow Equal)
- useCallback을 이용한 함수 최적화
- useMemo를 이용한 결과 값 최적화

---

### 1. React Profiler로 성능측정하기

첫 번째 "h"를 타이핑 해서 ReRendering을 했을 때 컴포넌트 마다 걸린 시간을
React-Profiler 확장 프로그램을 통해 확인했습니다.
App Component: 14.2ms
A Component: 3.7ms
B Component: 9.3ms

-> 컴포넌트 내부의 기능들을 쪼개었을때가 훨씬 느리게 동작하고 있습니다.
