import { AddIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    UnorderedList,
    useDisclosure,
  } from "@chakra-ui/react";
import { useState } from 'react';
import { useStore } from '../../stores/appStore';
import { v4 as uuidv4 } from "uuid";
import './AngularModuleComponent.css';

const AngularModuleComponent = (props : any) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [componentName, setComponentName] = useState("");

    const { addComponentToModule } = useStore();

    const saveAddComponentModal = () => {
        addComponentToModule(
          props.module.id,
        {
          id: uuidv4(),
          name: `${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Component`
        });
        setComponentName('');
        onClose();
      };

  return (
      <>
      <div className='angular-module-wrapper'>
       <p>{props.module.name}</p>
       
       <Button
          size='sm'
          leftIcon={<AddIcon />}
          colorScheme="white"
          bgColor='black'
          variant="solid"
          onClick={onOpen}
        >
          Create Component
        </Button>
        <UnorderedList style={{marginLeft: '30px'}}>
          {props.module.components}
          <ListItem>Lorem ipsum dolor sit amet</ListItem>
       </UnorderedList>
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