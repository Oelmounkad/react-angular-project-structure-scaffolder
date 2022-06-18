import { AddIcon } from "@chakra-ui/icons";
import { FaAngular } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import React, { useRef, useState } from "react";
import { useStore } from "../../stores/appStore";
import { v4 as uuidv4 } from "uuid";
import "./AngularModuleComponent.css";
import { filteredExportedModulesToShow, filteredImportedModulesToShow } from "../../functions/angular-module-functions";

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

  const {
    isOpen: isOpenExportModule,
    onOpen: onOpenExportModule,
    onClose: onCloseExportModule,
  } = useDisclosure();

  const {
    isOpen: isOpenProvideService,
    onOpen: onOpenProvideService,
    onClose: onCloseProvideService,
  } = useDisclosure();

  const {
    isOpen: isOpenRemoveModulePrompt,
    onOpen: onOpenRemoveModulePrompt,
    onClose: onCloseRemoveModulePrompt,
  } = useDisclosure();

  const toast = useToast();

  const cancelRef = useRef() as unknown as React.MutableRefObject<HTMLInputElement>;

  const [componentName, setComponentName] = useState('');
  const [moduleToRemove, setModuleToRemove] = useState({} as IModule);

  const {
    addComponentToModule,
    removeModule,
    removeComponentFromModule,
    addImportedModuleToModule,
    addExportedModuleToModule,
    removeImportedModuleFromModule,
    removeExportedModuleFromModule,
    modules,
  } = useStore();

  const [selectedImportedModule, setSelectedImportedModule] = useState("");
  const [selectedExportedModule, setSelectedExportedModule] = useState("");

  const removeModulePrompt = (module: IModule): void => {
    setModuleToRemove(module);
    onOpenRemoveModulePrompt();
  };
  const localRemoveModule = (module: IModule) => {
    removeModule(module.id);
    setModuleToRemove({} as IModule);
    onCloseRemoveModulePrompt();
  }



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

    if (!moduleToImport) {
      toast({
        title: `you have to choose a module to import`,
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }

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

  const addSelectedExportedModule = (moduleName: string) => {
    const moduleToExport: IModule = modules.find(
      (module: IModule) => module.name === moduleName
    );
    const hostingModule: IModule = modules.find(
      (module: IModule) => module.name === props.module.name
    );

    if (!moduleToExport) {
      toast({
        title: `you have to choose a module to export`,
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }

    addExportedModuleToModule(moduleToExport, hostingModule);
    setSelectedExportedModule("");
    onCloseExportModule();

    toast({
      title: "Exported Module.",
      description: "Module Exported to your module.",
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
            onClick={() => removeModulePrompt(props.module)}
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
          onClick={onOpenExportModule}
        >
          Export Modules
        </Button>

        <Button
          size="sm"
          leftIcon={<AddIcon />}
          colorScheme="white"
          bgColor="#FBC02D"
          variant="solid"
          onClick={onOpenProvideService}
        >
          Provide Services
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

        {props.module.exportedModules.length > 0 && (
          <i>
            <u className="component-title">Exported Modules :</u>
          </i>
        )}
        <ul style={{ marginLeft: "30px" }}>
          {props.module.exportedModules.map((module: IModule) => (
            <div className="component-item-flex">
              <li style={{ paddingBottom: "10px" }}>{module.name}</li>
              <CloseButton
                size="md"
                onClick={() =>
                  removeExportedModuleFromModule(module, props.module)
                }
              />
            </div>
          ))}
        </ul>

        {props.module.providedServices.length > 0 && (
          <i>
            <u className="component-title">Exported Modules :</u>
          </i>
        )}
        <ul style={{ marginLeft: "30px" }}>
          {props.module.providedServices.map((service: IService) => (
            <div className="component-item-flex">
              <li style={{ paddingBottom: "10px" }}>{service.name}</li>
              <CloseButton
                size="md"
                /* onClick={() =>
                  removeProvidedServiceFromModule(module, props.module)
                } */
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
              Add Component
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
                    filteredImportedModulesToShow(module,props.module)
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

      {/* Modal to add an exported Module */}
      <Modal isOpen={isOpenExportModule} onClose={onCloseExportModule}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select modules to Export</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Select
                value={selectedExportedModule}
                onChange={(e) => {
                  setSelectedExportedModule(e.target.value);
                }}
                variant="filled"
                placeholder="Select a module"
              >
                {modules
                  ?.filter((module: IModule) =>
                    filteredExportedModulesToShow(module, props.module)
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
              onClick={() => addSelectedExportedModule(selectedExportedModule)}
            >
              Export Module
            </Button>
            <Button onClick={onCloseExportModule}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal to Provide a service */}
      <Modal isOpen={isOpenExportModule} onClose={onCloseExportModule}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select modules to Export</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Select
                value={selectedExportedModule}
                onChange={(e) => {
                  setSelectedExportedModule(e.target.value);
                }}
                variant="filled"
                placeholder="Select a module"
              >
                {modules
                  ?.filter((module: IModule) =>
                    filteredExportedModulesToShow(module, props.module)
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
              onClick={() => addSelectedExportedModule(selectedExportedModule)}
            >
              Export Module
            </Button>
            <Button onClick={onCloseExportModule}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/** Alert dialog to delete module */}
      <AlertDialog
        isOpen={isOpenRemoveModulePrompt}
        leastDestructiveRef={cancelRef}
        onClose={onCloseRemoveModulePrompt}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Module
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete <strong>{moduleToRemove.name}</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseRemoveModulePrompt}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => localRemoveModule(moduleToRemove)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AngularModuleComponent;
