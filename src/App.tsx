import CounterContainer from "./container/CounterContainer"

import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #deeeff;
  }
`

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <CounterContainer />
    </div>
  )
}

export default App
