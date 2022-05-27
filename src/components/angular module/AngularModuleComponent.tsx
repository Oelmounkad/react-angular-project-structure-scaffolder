import { AddIcon } from '@chakra-ui/icons';
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
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
import { useState } from 'react';
import { useStore } from '../../stores/appStore';
import { v4 as uuidv4 } from "uuid";
import './AngularModuleComponent.css';

const AngularModuleComponent = (props : any) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const [componentName, setComponentName] = useState("");

    const { addComponentToModule, removeModule, removeComponentFromModule } = useStore();

    const saveAddComponentModal = () => {
        addComponentToModule(
          props.module.id,
        {
          id: uuidv4(),
          name: `${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Component`
        });
        setComponentName('');
        onClose();

        toast({
          title: 'Component Added.',
          description: "Component Added to your module.",
          status: 'success',
          duration: 1000,
          position: 'top',
          isClosable: true,
        })
      };

  return (
      <>
      <div className='angular-module-wrapper'>
        <div className='angular-module-header'>
                 <p className='module-name'><FaAngular />{props.module.name}</p>
                 <CloseButton size='md' onClick={() => removeModule(props.module.id)} />

        </div>
       
       <Button
          size='sm'
          leftIcon={<AddIcon />}
          colorScheme="white"
          bgColor='black'
          variant="solid"
          onClick={onOpen}
        >
          Create Component
        </Button><br />
        { props.module.components.length > 0 && <i className='component-title'>Components :</i>  }
        <ul style={{marginLeft: '30px'}}>
          {props.module.components.map((component : IComponent) => (
            <div className='component-item-flex'>
            <li style={{paddingBottom: '10px'}}>{ component.name }</li>
            <CloseButton size='md' onClick={() => removeComponentFromModule(props.module.id,component.id)} />
            </div>
            
          ))}
       </ul>
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