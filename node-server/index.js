
const express = require('express');
const cors = require('cors');

const app = express();
const fs = require("fs");
const archiver = require('archiver');
const { moduleFileTemplate, componentTsFileTemplate, componentHtmlFileTemplate, serviceTsFileTemplate, serviceSpecFileTemplate } = require('./angular-file-templates');
const { projectStructure } = require('./angular-project-structure.mock');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

app.use(cors());

app.get('/', async (req,res) => {

  const output = fs.createWriteStream('angular-project-structure.zip');
  
  // Creating the project structure

  fs.mkdir("src", (err) => {

    projectStructure.modules?.forEach((module) => {
      const directoryName = module.name.replace("Module", "").toLowerCase();
      fs.mkdir("src/" + directoryName, (err) => {

        createModuleFile("src/" + directoryName, module);
  
        module.components.forEach((component) => {
          createComponentFiles("src/" + directoryName, component);
        });
  
        module.providedServices.forEach((service) => {
          createServiceFiles("src/" + directoryName, service);
        });
      });
    });
  
    projectStructure.globalServices?.forEach((service) => {
      const serviceName = service.name.replace("Service", "").toLowerCase();
      const serviceTsFile = serviceName + ".service.ts";
      const serviceSpecFile = serviceName + ".service.spec.ts";
  
      fs.appendFile(
        "src/" + serviceTsFile,
        getServiceTsFileContentFromTemplate(service, true),
        (err) => {}
      );
      fs.appendFile(
        "src/" + serviceSpecFile,
        getServiceSpecFileContentFromTemplate(service),
        (err) => {}
      );

    });
    // Archiving the data
      output.on('end', function() {
        console.log('Data has been drained');
      });
    
      archive.on('error', function(err) {
        throw err;
      });
    
      output.on('close', function() {
        res.download('angular-project-structure.zip');
      });
    
      archive.pipe(output);
      archive.directory('src/', 'src');
      archive.finalize();
  });
});

app.listen(4000);
 




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
    module.name.replace("Module", "").toLowerCase() + ".module.ts";

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

const getModuleFileContentFromTemplate = (module) => {
  const declaredComponents = module.components
    .map((component) => `\t${component.name}`)
    .join(",\n");
  const componentsImports = module.components
    .map(
      (component) =>
        `import { ${component.name} } from './components/${component.name
          .replace("Component", "")
          .toLowerCase()}.component.ts';\n`
    )
    .join("");
  const importedModules = module.importedModules
    .map((module) => `\t${module.name}`)
    .join(",\n");
  const exportedModules = module.exportedModules
    .map((module) => `\t${module.name}`)
    .join(",\n");
  const providedServices = module.providedServices
    .map((service) => `\t${service.name}`)
    .join(",\n");

  return moduleFileTemplate
    .replace("$moduleName", module.name)
    .replace("$declaredComponents", declaredComponents)
    .replace("$componentImports", componentsImports)
    .replace("$importedModules", importedModules)
    .replace("$exportedModules", exportedModules)
    .replace("$providedServices", providedServices);
};

const getComponentTsFileContentFromTemplate = (component) => {
  return componentTsFileTemplate
    .replaceAll(
      "$componentName",
      component.name.replace("Component", "").toLowerCase()
    )
    .replace("$fullComponentName", component.name);
};

const getComponentHtmlFileContentFromTemplate = (component) => {
  return componentHtmlFileTemplate.replace(
    "$componentName",
    component.name.replace("Component", "").toLowerCase()
  );
};

const getServiceTsFileContentFromTemplate = (service, global) => {
  let serviceFileContent = serviceTsFileTemplate.replace(
    "$fullServiceName",
    service.name
    );
    if (global) {
      serviceFileContent = serviceFileContent.replace(
        "@Injectable({})",
        `@Injectable({\n\tprovidedIn: 'root'\n})`
      );
  
    }
    
    return serviceFileContent;
  };

const getServiceSpecFileContentFromTemplate = (service) => {
  return serviceSpecFileTemplate
    .replaceAll("$fullServiceName", service.name)
    .replaceAll(
      "$serviceName",
      service.name.replace("Service", "").toLowerCase()
    );
};