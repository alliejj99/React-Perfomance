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
