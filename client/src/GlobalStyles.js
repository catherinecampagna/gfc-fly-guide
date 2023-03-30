import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  /* Font styles */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Serif', serif;
  }

  body {
    font-family: 'Crimson Pro', serif;
    font-weight: 400;
    font-style: normal;
  }

  .fly-names, .fly-titles {
    font-weight: bold;
  }

  .fly-types {
    font-style: italic;
  }

  /* Background colors */
  body {
    background-color: #013926;
  }

  .secondary-bg {
    background-color: #f5fffa;
  }

  /* Buttons */
  .button1 {
    background-color: #f5fffa;
    color: #013926;
    border-radius: 5px;
  }

  .button2 {
    background-color: #013926;
    color: #f5fffa;
    border-radius: 5px;
  }

  .button3 {
    background-color: transparent;
    color: #f5fffa;
    border: 1px solid #f5fffa;
    border-radius: 5px;
  }
`;

export default GlobalStyles;
