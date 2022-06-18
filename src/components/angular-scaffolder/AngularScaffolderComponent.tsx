import { AddIcon } from "@chakra-ui/icons";
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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "../../stores/appStore";
import AngularModuleComponent from "../angular module/AngularModuleComponent";
import { v4 as uuidv4 } from "uuid";
import "./AngularScaffolderComponent.css";
import { FaAngular } from "react-icons/fa";

const AngularScaffolderComponent = () => {
  const { isOpen : isOpenAddModule, onOpen: onOpenAddModule, onClose: onCloseAddModule } = useDisclosure();
  const { isOpen : isOpenAddGlobalService, onOpen: onOpenAddGlobalService, onClose: onCloseAddGlobalService } = useDisclosure();

  const [moduleName, setModuleName] = useState("");

  const [globalServiceName, setGlobalServiceName] = useState("");
  
  const { addModule, addGlobalService, modules, globalServices, removeGlobalService } = useStore();

  const saveAddModuleModal = () => {
    const newModule : IModule = {
      id: uuidv4(),
      name: `${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}Module`
    }
    addModule(newModule);
    setModuleName('');
    onCloseAddModule();
  };

  const saveAddGlobalServiceModal = () => {
    const newGlobalService : IService = {
      id: uuidv4(),
      name: `${globalServiceName.charAt(0).toUpperCase()}${globalServiceName.slice(1)}Service`
    }
    addGlobalService(newGlobalService);
    setGlobalServiceName('');
    onCloseAddGlobalService();
  };

  return (
    <div className="angular-scaffolder-wrapper">
      <Stack direction='row' spacing={4} align='center'>
          <Button onClick={onOpenAddModule} leftIcon={<AddIcon />} colorScheme='red'>
            Add Module
          </Button>
          <Button onClick={onOpenAddGlobalService} leftIcon={<AddIcon />} colorScheme='yellow'>
            Add Global Service
          </Button>
      </Stack>
<div className="modules-services-header">
         {modules.length > 0 && <i>
            <u>Modules :</u>
          </i>} 

          {globalServices.length > 0 && <i>
            <u>Global Services :</u>
          </i>}
</div>
     

<div className={modules.length > 0 ? "modules-services-wrapper-gapped" : "modules-services-wrapper"}>
 {/* List Angular Modules */}
 <div>
        {modules.map((m: IModule) => (
          <AngularModuleComponent key={m.id} module={m} />
        ))}
      </div>
       {/* List Angular Global Services */}
       <div>
        {globalServices.map((service: IService) => (
          <div className="angular-service-wrapper">
          <div className="angular-service-header">
            <p className="service-name">
              <FaAngular /> &nbsp;{service.name}
            </p>
            <CloseButton
            onClick={() => removeGlobalService(service.id)}
              size="md"
            />
          </div>
          </div>
          
        ))}
      </div>
</div>
   

{/* Modal to add an angular Module */}
<Modal isOpen={isOpenAddModule} onClose={onCloseAddModule}>
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
            <Button onClick={onCloseAddModule}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal to add a global service */}
      <Modal isOpen={isOpenAddGlobalService} onClose={onCloseAddGlobalService}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create A global Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Service Name</FormLabel>
              <Input
                value={globalServiceName}
                onChange={(e) => setGlobalServiceName(e.target.value)}
                placeholder="Module name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => saveAddGlobalServiceModal()}
            >
              Save
            </Button>
            <Button onClick={onCloseAddGlobalService}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  );
};

export default AngularScaffolderComponent;
