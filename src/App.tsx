import "./App.css";
import ScaffolderButtonsComponent from "./components/scaffolder-buttons/ScaffolderButtonsComponent";
import { ChakraProvider } from "@chakra-ui/react";
import ScaffolderComponent from "./components/scaffolder/ScaffolderComponent";

function App() {

  return (
      <ChakraProvider>
        <div className='flex-inprogress'>Project In progress...</div>
        <ScaffolderButtonsComponent />
        <ScaffolderComponent />
             
      </ChakraProvider>
  );
}

export default App;
