<div align="center">
<img width="542" height="273" alt="스크린샷 2025-10-02 오후 8 22 29" src="https://github.com/user-attachments/assets/9b77140f-1697-4f39-b529-0b43f1cf1650" />
</div>

# 📌 프로젝트 소개
Next.js에서 시스템 폰트 이외의 폰트를 사용할 때 가장 좋은 성능을 보이는 상황을 찾기 위한 프로젝트입니다.

### 스킬
![Typescript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)

### 사용한 폰트
Pretendard, 양진체

### 성능 확인 방법
1. Network 탭에서 폰트 파일 요청 순서 확인
2. Performance 탭에서 웹폰트의 Decoded Body와 Duration 및 Content Downloading 시간 확인
3. Lighthouse Mobile로 LCP, FCP 확인

# 📌 성능 측정 결과
| 종류 \ Lighthoue Mobile | FOUT | LCP | FCP |
|---| :---: | :---: | :---: | 
| [시스템 폰트] | X | 1.6s | 0.8s |
| [로컬 폰트] Pretendard.ttf 2개 + localFont | X | 14.0s | 0.8s |
| [로컬 폰트] Pretendard.otf 2개 + localFont | X | 12.6s | 0.8s |
| [로컬 폰트] Pretendard.woff 2개 + localFont | X | 13.4s | 1.2s |
| [로컬 폰트] Pretendard.woff2 2개 + localFont | X | 13.4s | 1.2s |
| [로컬 폰트] Pretendard.subset.woff 2개 + localFont | X | 5.3s | 0.8s |
| **[로컬 폰트] Pretendard.subset.woff2 2개 + localFont** | **X** | **4.7s** | **0.8s** |
| [로컬 폰트] Pretendard.subset.woff2 9개 + localFont | X | 15.1s | 0.8s |
| **[로컬 폰트] Variable.ttf + localFont** | **O** | **1.6s** | **0.8s** |
| [로컬 폰트] Variable.woff2 + localFont | X | 11.9s | 1.2s |
| [웹폰트] pretendard.min.css (`@import`) | 폰트 적용 안 됨 | - | - |
| [웹폰트] pretendard.min.css (`<link>`) | O | 1.7s | 1.4s |
| [웹폰트] pretendard-dynamic-subset.min.css (`<link>`) | O | 2.7s | 2.1s |
| [웹폰트] pretendard-dynamic-subset.min.css (`<link>`) + `<link rel="preconnect/>` | O | 2.0s | 1.7s |
| **[웹폰트] pretendardvariable.min.css (`<link>`) + `<link rel="preconnect/>`** | **O** | **1.7s** | **1.4s** |
| [웹폰트] pretendardvariable-dynamic-subset.min.css (`<link>`) + `<link rel="preconnect/>` | O | 1.9s | 1.4s |
| [로컬 폰트] 양진체.otf + localFont | X | 4.7s | 1.2s |
| [웹폰트] 양진체.woff + preload | X | 4.5s | 0.8s |
| [웹폰트] 양진체.woff + `@import` | X | 4.5s | 0.8s |
| **[로컬 폰트] 양진체.woff2 + localFont** [(폰트 변환 사이트 활용)](https://transfonter.org/) | **X** | **3.0s** | **0.8s** |

# 📌 결론

## 선택 : Pretendard.subset.woff2 + localFont
- 개인적으로 FOUT는 발생하지 않아야 한다고 생각
  - 번들 크기가 커지면 웹폰트보다 서브셋 로컬 폰트가 더 빠를 수 있음
  - 이때, 9개의 폰트 굵기가 모두 필요하다면 **Variable.woff2 + localFont**
- FOUT이 발생하는 것이 상관 없다면, **가변 웹폰트(pretendardvariable.min.css) **
- Pretendard는 폰트 변환 사이트를 통한 변환이 의미가 없음
- hydration이나 Client 컴포넌트가 많은 경우, 또는 설치한 라이브러리가 많은 경우, 번들 사이즈는 커진다. 이런 경우, 가변 웹폰트보다 서브셋 로컬 폰트의 성능이 더 좋을 수 있다.

## Pretendard가 아닌 경우 (like 양진체) : `.woff2` 로컬 폰트
- 확장자 우선순위 : `subset.woff2` > `subset.woff` > `.woff2` > `.woff` > `.otf` > `.ttf`
- `.woff`/`.woff2` 형식이 없는 경우, [폰트 변환 사이트](https://transfonter.org/)에서 `.woff2` 형식으로 바꿔서 로컬 폰트로 사용하기
- 변환하고 싶지 않은데 로컬 폰트는 `.otf`/`.ttf`만 제공하고 웹 폰트는 `.woff`/`.woff2`를 제공하는 경우, 웹폰트 선택
- 모든 두께를 전부 사용할 경우 : 가변 폰트 (제공하는 경우)
- 서너 개 이하로만 사용할 경우 : 필요한 폰트만 두께별로 설치
- Next.js의 localFont는 기본적으로 `<link rel="preload"/>` 최적화를 지원한다.
- 물론 개인의 결론일 뿐 상황이나 기획에 따라 선택해야 하는 방법은 다를 수 있음

## 웹폰트를 사용해야 할 때 `<link rel="preload"/>` vs `@import`
- `<link rel="preload"/>`
- 네트워크 요청 우선 순위가 더 높기 때문
- css를 요청하는 경우, `@import`는 적용되지 않음
