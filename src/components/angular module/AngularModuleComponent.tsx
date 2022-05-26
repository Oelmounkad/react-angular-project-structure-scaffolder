import { AddIcon } from '@chakra-ui/icons';
import {
    Button,
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
    useDisclosure,
  } from "@chakra-ui/react";
import { useState } from 'react';
import './AngularModuleComponent.css';

const AngularModuleComponent = (props : any) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [componentName, setComponentName] = useState("");

    const saveAddComponentModal = () => {
       /*  addComponentToModule({
          name: `${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Module`
        }); */
        setComponentName('');
        onClose();
      };

  return (
      <>
      <div className='angular-module-wrapper'>
       <p>{props.module.name}</p>
       <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          variant="solid"
        >
          Create Component
        </Button>
    </div>
    {/* Modal to add an angular Component */}
    <Modal isOpen={isOpen} onClose={onClose}>
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
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
      </>
    
  )
}

export default AngularModuleComponent