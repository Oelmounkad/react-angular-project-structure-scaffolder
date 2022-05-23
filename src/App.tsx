import "./App.css";
import ScaffolderButtonsComponent from "./components/scaffolder-buttons/ScaffolderButtonsComponent";
import { ChakraProvider } from "@chakra-ui/react";
import AppState from "./context/AppContext/AppState";
import ScaffolderComponent from "./components/scaffolder/ScaffolderComponent";

function App() {

  return (
    <AppState>
      <ChakraProvider>
        <ScaffolderButtonsComponent />
        <ScaffolderComponent />
             
      </ChakraProvider>
    </AppState>
  );
}

export default App;
