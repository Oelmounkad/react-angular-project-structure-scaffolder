import { Button, Stack } from "@chakra-ui/react";
import { DiAngularSimple, DiReact } from "react-icons/di";
import { useStore } from "../../stores/appStore";
import "./ScaffolderButtonsComponent.css";

const ScaffolderButtonsComponent = () => {
  const { updateScaffolder } = useStore();

  return (
      <>
    <div className="switch-buttons">
      <Stack direction="row" spacing={4}>
        <Button
          leftIcon={<DiAngularSimple />}
          colorScheme="red"
          variant="solid"
          onClick={() => updateScaffolder('angular')}
        >
          Angular Scaffolder
        </Button>
        <Button leftIcon={<DiReact />} colorScheme="blue" variant="solid" onClick={() => updateScaffolder('react')}>
          React Scaffolder
        </Button>
      </Stack>
    </div>
      </>
  );
};

export default ScaffolderButtonsComponent;
