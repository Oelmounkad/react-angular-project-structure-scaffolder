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
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "../../stores/appStore";
import AngularModuleComponent from "../angular module/AngularModuleComponent";
import { v4 as uuidv4 } from "uuid";
import "./AngularScaffolderComponent.css";
import { FaAngular, FaDownload } from "react-icons/fa";
import axios from 'axios';
import fileDownload from "js-file-download";

const AngularScaffolderComponent = () => {
  const { isOpen : isOpenAddModule, onOpen: onOpenAddModule, onClose: onCloseAddModule } = useDisclosure();
  const { isOpen : isOpenAddGlobalService, onOpen: onOpenAddGlobalService, onClose: onCloseAddGlobalService } = useDisclosure();

  const [moduleName, setModuleName] = useState("");

  const [globalServiceName, setGlobalServiceName] = useState("");

  const [loading, setLoading] = useState(false);
  
  const { addModule, addGlobalService, modules, globalServices, removeGlobalService } = useStore();

  const toast = useToast();

  const saveAddModuleModal = () => {
    const reg = /^[a-z]+$/i;
    if (!reg.test(moduleName)) {
      toast({
        title: `name should only includes letters`,
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }
    const newModule : IModule = {
      id: uuidv4(),
      name: `${moduleName.charAt(0).toUpperCase()}${moduleName.slice(1)}Module`
    }
    addModule(newModule);
    setModuleName('');
    onCloseAddModule();
  };

  const saveAddGlobalServiceModal = () => {
    const reg = /^[a-z]+$/i;
    if (!reg.test(globalServiceName)) {
      toast({
        title: `name should only includes letters`,
        status: "error",
        position: "top",
        isClosable: true,
      });
      return;
    }
    const newGlobalService : IService = {
      id: uuidv4(),
      name: `${globalServiceName.charAt(0).toUpperCase()}${globalServiceName.slice(1)}Service`
    }
    addGlobalService(newGlobalService);
    setGlobalServiceName('');
    onCloseAddGlobalService();
  };

  const generateAngularProject = () => {
    setLoading(true);
    const payload = {
      modules,
      globalServices
  };

  axios({
    url : 'https://angular-scaffolder-node.herokuapp.com/angular-project-scaffolder',
    method: 'POST',
    responseType: 'arraybuffer',
  data: {
    projectStructure: JSON.stringify(payload)
  }
  }).then((res) => {
    setLoading(false);
    fileDownload(res.data, 'angular-project-structure.zip');
  }).finally(() => {
    setLoading(false);
  })
  };

  return (
    <div className="angular-scaffolder-wrapper">
      <div className="tools"> <i> <u>Tools:</u> </i> </div>
      <Stack direction='row' spacing={4} align='center' justifyContent='center'>
          <Button onClick={onOpenAddModule} leftIcon={<AddIcon />} colorScheme='red'>
            Add Module
          </Button>
          <Button onClick={onOpenAddGlobalService} leftIcon={<AddIcon />} colorScheme='yellow'>
            Add Global Service
          </Button>
          <Button onClick={() => generateAngularProject()} leftIcon={<FaDownload />} colorScheme='green'>
            Generate Angular Project
          </Button>
         {loading && <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='green.500'
            size='lg'
          />  } 
      </Stack>
      <br />
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
