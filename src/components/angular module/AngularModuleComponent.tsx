import { AddIcon } from "@chakra-ui/icons";
import { FaAngular } from "react-icons/fa";
import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "../../stores/appStore";
import { v4 as uuidv4 } from "uuid";
import "./AngularModuleComponent.css";

const AngularModuleComponent = (props: any) => {
  const {
    isOpen: isOpenAddComponent,
    onOpen: onOpenAddComponent,
    onClose: onCloseAddComponent,
  } = useDisclosure();

  const {
    isOpen: isOpenImportModule,
    onOpen: onOpenImportModule,
    onClose: onCloseImportModule,
  } = useDisclosure();

  const toast = useToast();

  const [componentName, setComponentName] = useState("");

  const {
    addComponentToModule,
    removeModule,
    removeComponentFromModule,
    addImportedModuleToModule,
    removeImportedModuleFromModule,
    modules,
  } = useStore();

  const [selectedImportedModule, setSelectedImportedModule] = useState("");

  const filteredImportedModulesToShow = (module: IModule): boolean => {
    return (
      module.name !== props.module.name &&
      !props.module.importedModules.map((module: IModule) => module.id).includes(module.id)
    );
  };

  const saveAddComponentModal = () => {
    addComponentToModule(props.module.id, {
      id: uuidv4(),
      name: `${componentName.charAt(0).toUpperCase()}${componentName.slice(
        1
      )}Component`,
    });
    setComponentName("");
    onCloseAddComponent();

    toast({
      title: "Component Added.",
      description: "Component Added to your module.",
      status: "success",
      duration: 1000,
      position: "top",
      isClosable: true,
    });
  };

  const addSelectedImportedModule = (moduleName: string) => {
    const moduleToImport: IModule = modules.find(
      (module: IModule) => module.name === moduleName
    );
    const hostingModule: IModule = modules.find(
      (module: IModule) => module.name === props.module.name
    );
    addImportedModuleToModule(moduleToImport, hostingModule);
    setSelectedImportedModule("");
    onCloseImportModule();

    toast({
      title: "Imported Module.",
      description: "Module imported to your module.",
      status: "success",
      duration: 1000,
      position: "top",
      isClosable: true,
    });
  };

  return (
    <>
      <div className="angular-module-wrapper">
        <div className="angular-module-header">
          <p className="module-name">
            <FaAngular /> &nbsp;{props.module.name}
          </p>
          <CloseButton
            size="md"
            onClick={() => removeModule(props.module.id)}
          />
        </div>

        <Button
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="white"
          bgColor="#009688"
          variant="solid"
          onClick={onOpenAddComponent}
        >
          Create Component
        </Button>
        <Button
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="white"
          bgColor="#536DFE"
          variant="solid"
          onClick={onOpenImportModule}
        >
          Import Modules
        </Button>

        <Button
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="white"
          bgColor="black"
          variant="solid"
          onClick={onOpenAddComponent}
        >
          Export Modules
        </Button>
        <br />
        {props.module.components.length > 0 && (
          <i>
            <u className="component-title">Components :</u>
          </i>
        )}
        <ul style={{ marginLeft: "30px" }}>
          {props.module.components.map((component: IComponent) => (
            <div className="component-item-flex">
              <li style={{ paddingBottom: "10px" }}>{component.name}</li>
              <CloseButton
                size="md"
                onClick={() =>
                  removeComponentFromModule(props.module.id, component.id)
                }
              />
            </div>
          ))}
        </ul>
        {props.module.importedModules.length > 0 && (
          <i>
            <u className="component-title">Imported Modules :</u>
          </i>
        )}
        <ul style={{ marginLeft: "30px" }}>
          {props.module.importedModules.map((module: IModule) => (
            <div className="component-item-flex">
              <li style={{ paddingBottom: "10px" }}>{module.name}</li>
              <CloseButton
                size="md"
                onClick={() =>
                  removeImportedModuleFromModule(module, props.module)
                }
              />
            </div>
          ))}
        </ul>
      </div>
      {/* Modal to add an angular Component */}
      <Modal isOpen={isOpenAddComponent} onClose={onCloseAddComponent}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Component</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Component name</FormLabel>
              <Input
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                placeholder="Component name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => saveAddComponentModal()}
            >
              Save
            </Button>
            <Button onClick={onCloseAddComponent}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal to add an imported Module */}
      <Modal isOpen={isOpenImportModule} onClose={onCloseImportModule}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select modules to import</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {/* <FormLabel>Component name</FormLabel> */}
              <Select
                value={selectedImportedModule}
                onChange={(e) => {
                  setSelectedImportedModule(e.target.value);
                }}
                variant="filled"
                placeholder="Select a module"
              >
                {modules
                  ?.filter((module: IModule) =>
                    filteredImportedModulesToShow(module)
                  )
                  .map((module: IModule) => (
                    <option value={module.name}>{module.name}</option>
                  ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => addSelectedImportedModule(selectedImportedModule)}
            >
              Import Module
            </Button>
            <Button onClick={onCloseImportModule}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AngularModuleComponent;
