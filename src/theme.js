/**
 * theme.js : styled-components에서 사용할 theme을 정의
 * Theming 관련 공식문서 : https://styled-components.com/docs/advanced#function-themes
 */

// media query를 좀 더 간편하게 쓰기 위해 문자열을 theme으로 등록 (반응형 웹)
const device = {
  tablet: `@media screen and (min-width: 768px)`,
  desktop: `@media screen and (min-width: 1024px)`,
};

// 주로 사용하는 색상을 theme으로 지정
const colors = {
  red: "#c42034",
  blue: "#0984e3",
  white: "#FFFFFF",
  black: "222222",
};

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "20px",
  xl: "24px",
};



const theme = {
  device,
  colors,
  fontSizes,
};

export default theme;
