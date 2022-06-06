/**
 * GlobalStyles.js
 * 글로벌하게 적용되는 스타일만 모아서 작성
 */

 import { createGlobalStyle } from "styled-components";
 import { reset } from "styled-reset";

 const GlobalStyles = createGlobalStyle`
   /* reset.css 를 리액트에서 쉽게 사용하는 방법 */
   ${reset}
 
   /* font 가져오기 */
   @font-face {
     font-family: 'Roboto', sans-serif;
     src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
    }
 
   * {
     box-sizing: border-box;
   }
 
   body {
     min-height: 100vh - 60px;
     font-family: 'Roboto', sans-serif;
   }
 
   a {
     text-decoration: none;
     color: black;
   }
 
   button {
     cursor: pointer;
   }
 
   input,
   textarea,
   button {
     border: none;
     background-color: transparent;
     font-family: 'Roboto', sans-serif;
     outline: none;
   }
 `;
 
 export default GlobalStyles;
 