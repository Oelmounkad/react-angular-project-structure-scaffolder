import "./App.css";
import ScaffolderButtonsComponent from "./components/scaffolder-buttons/ScaffolderButtonsComponent";
import { ChakraProvider } from "@chakra-ui/react";
import ScaffolderComponent from "./components/scaffolder/ScaffolderComponent";

function App() {

  return (
      <ChakraProvider>
        <ScaffolderButtonsComponent />
        <ScaffolderComponent />
             
      </ChakraProvider>
  );
}

export default App;
