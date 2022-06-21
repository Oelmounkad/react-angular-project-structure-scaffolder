import { Button, Stack } from "@chakra-ui/react";
import { DiAngularSimple, DiReact } from "react-icons/di";
import { useStore } from "../../stores/appStore";
import "./ScaffolderButtonsComponent.css";
import axios from 'axios';
import fileDownload from "js-file-download";

const ScaffolderButtonsComponent = () => {
  const { updateScaffolder } = useStore();

  const getStructure = () => {
    axios({
      url: '',
      method: 'GET',
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/gzip'
    }
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, 'xdaxios.zip');
    })

    /* fetch("http://localhost:4000/",
        { 
            method: "GET",
            headers: { "Content-Type": "application/json",},
        }).then(response => response.blob()).then(res => fileDownload(res,'xd.zip')) */
  }

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
        <Button colorScheme="blue" variant="solid" onClick={() => getStructure()}>
           Click me
        </Button>
      </Stack>
    </div>
      </>
  );
};

export default ScaffolderButtonsComponent;
