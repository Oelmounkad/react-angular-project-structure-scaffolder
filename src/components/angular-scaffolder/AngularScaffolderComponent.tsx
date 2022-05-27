import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "../../stores/appStore";
import AngularModuleComponent from "../angular module/AngularModuleComponent";
import { v4 as uuidv4 } from "uuid";
import "./AngularScaffolderComponent.css";

const AngularScaffolderComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [moduleName, setModuleName] = useState("");

  const { addModule, modules } = useStore();

  const saveAddModuleModal = () => {
    const newModule : IModule = {
      id: uuidv4(),
      name: `${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}Module`
    }
    addModule(newModule);
    setModuleName('');
    onClose();
  };

  return (
    <div className="angular-scaffolder-wrapper">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="red"
        >
          Scaffold your project
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Add Module</MenuItem>
          <MenuItem>Add Component</MenuItem>
        </MenuList>
      </Menu>
     
     {/* Modal to add an angular Module */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Module name (without module keyword)</FormLabel>
              <Input
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Module name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => saveAddModuleModal()}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    {/* List Angular Modules */}
      <>
        {modules.map((m: IModule) => (
          <AngularModuleComponent key={m.id} module={m} />
        ))}
      </>
    </div>
  );
};

export default AngularScaffolderComponent;
