const fs = require('fs');
const { getModuleFileContentFromTemplate, getServiceSpecFileContentFromTemplate, getServiceTsFileContentFromTemplate, getComponentHtmlFileContentFromTemplate, getComponentTsFileContentFromTemplate } = require('./angular-template-filler-functions');


const createComponentFiles = (baseDirectory, component) => {
    const componentDir = component.name.replace("Component", "").toLowerCase();
    const tsFileName = componentDir + ".component.ts";
    const htmlFileName = componentDir + ".component.html";
    const specsFileName = componentDir + ".component.spec.ts";
    const cssFileName = componentDir + ".component.css";
    fs.mkdir(
      baseDirectory + "/components/" + componentDir + "/",
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(err);
        }
        fs.appendFile(
          baseDirectory + "/components/" + componentDir + "/" + tsFileName,
          getComponentTsFileContentFromTemplate(component),
          (err) => {}
        );
        fs.appendFile(
          baseDirectory + "/components/" + componentDir + "/" + htmlFileName,
          getComponentHtmlFileContentFromTemplate(component),
          (err) => {}
        );
        fs.appendFile(
          baseDirectory + "/components/" + componentDir + "/" + specsFileName,
          "",
          (err) => {}
        );
        fs.appendFile(
          baseDirectory + "/components/" + componentDir + "/" + cssFileName,
          "",
          (err) => {}
        );
      }
    );
  };
  
  const createServiceFiles = (baseDirectory, service) => {
    const serviceName = service.name.replace("Service", "").toLowerCase();
    const tsFileName = serviceName + ".service.ts";
    const tsSpecFileName = serviceName + ".service.spec.ts";
    fs.mkdir(
      baseDirectory + "/services/" + serviceName + "/",
      { recursive: true },
      (err) => {
        if (err) {
          return console.error(err);
        }
        fs.appendFile(
          baseDirectory + "/services/" + serviceName + "/" + tsFileName,
          getServiceTsFileContentFromTemplate(service, false),
          (err) => {}
        );
        fs.appendFile(
          baseDirectory + "/services/" + serviceName + "/" + tsSpecFileName,
          getServiceSpecFileContentFromTemplate(service),
          (err) => {}
        );
      }
    );
  };
  
  const createModuleFile = (directoryName = "", module = "") => {
    const fileName =
      module?.name.replace("Module", "").toLowerCase() + ".module.ts";
  
    fs.appendFile(
      directoryName + "/" + fileName,
      getModuleFileContentFromTemplate(module),
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  };

  exports.createComponentFiles = createComponentFiles;
  exports.createServiceFiles = createServiceFiles;
  exports.createModuleFile = createModuleFile;