import { ChakraProvider } from "@chakra-ui/react"
import { Gallery } from "./Gallery"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

function App(){
   return(
    
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <Gallery />}  exact={true}/>
        </Routes>
      </Router>
    </ChakraProvider>
   )
}
export default App