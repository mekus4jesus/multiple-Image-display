import { ChakraProvider } from "@chakra-ui/react"
import { Gallery } from "./Gallery"

function App(){
   return(
    
    <ChakraProvider>
      <Gallery />
    </ChakraProvider>
   )
}
export default App