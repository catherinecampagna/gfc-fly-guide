import { createGlobalStyle, keyframes } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
    --color-background: #013926;
    --color-background-secondary: #f5fffa;
    --color-text: #f5fffa;
    --color-text-secondary: #013926;
    --color-primary: #f5fffa;
    --color-secondary: #3c4f4d;
    --color-accent: #ffdc34;
    --font-family-heading: 'Noto Serif Display', serif;
    --font-family-body: 'Crimson Pro', serif;
    --font-family-other: sans-serif;
    --font-weight-normal: 300;
    --font-weight-bold: bold;
    --font-style-normal: normal;
    --font-style-italic: italic;
    --font-size: 18px;
    --line-height: 1.5;
    --border-radius: 5px;
    --box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Reset styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Set default font family, size, and line height */
  body {
    font-family: var(--font-family-body);
    font-size: var(--font-size);
    line-height: var(--line-height);
    color: var(--color-text);
    font-weight: var(--font-weight-normal);
    font-style: var(--font-style-normal);
  }

  /* Headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-bold);
    line-height: 1.2;
  }

  h1 {
    font-size: 60px;
  }

  h2 {
    font-size: 50px;
  }

  h3 {
    font-size: 40px;
  }

  h4 {
    font-size: 30px;
  }

  h5 {
    font-size: 20px;
  }

  h6 {
    font-size: 20px;
    font-family: var(--font-family-body);
    font-weight: var(--font-weight-bold);
  }
  .fly-names, .fly-titles {
    font-weight: bold;
  }

  .fly-types {
    font-style: italic;
  }

  p {
    font-size: 16px;
  }

  /* Buttons */
  .button1 {
  text-align: center;
  font-weight: 500;
  border: 1px #013926 solid;
  background-color: #f5fffa;
  color: #013926;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 4px;
  font-size: 16px;
  padding: 20px 40px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  }

  .button2 {
    background-color: #013926;
    font-family: var(--font-family-body);
    font-weight: 300;
    border: none;
    color: #f5fffa;
    border-radius: 5px;
    padding: 20px 32px;
    font-size: 18px;
    width: 170px;
    text-align: center;
  }

  .button3 {
    background-color: transparent;
    color: #f5fffa;
    border: 1px solid #f5fffa;
    border-radius: 5px;
    padding: 20px 32px;
    font-size: 18px;
    width: 170px;
    text-align: center;
  }

  a {
  text-decoration: none;
}

.link {
  text-decoration: none;
}
`;

export default GlobalStyles;
