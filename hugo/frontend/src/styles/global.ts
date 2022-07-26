import { createGlobalStyle } from "styled-components";

const globalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {}
`;

export default globalStyles;
