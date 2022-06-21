const fs = require("fs");

const moduleFileTemplate = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
$componentImports
@NgModule({
declarations: [
$declaredComponents
],
imports: [
$importedModules
],
exports: [
$exportedModules
],
providers: [
$providedServices
],
})
export class $moduleName { }`;

const componentTsFileTemplate = `import { Component } from '@angular/core';

@Component({
  selector: '$componentName',
  templateUrl: './$componentName.component.html',
  styleUrls: ['./$componentName.component.css']
})

export class $fullComponentName { }`;

const componentHtmlFileTemplate = `<p>$componentName works!</p>`;

const serviceTsFileTemplate = `import { Injectable } from '@angular/core';

@Injectable({})
export class $fullServiceName {

  constructor() { }
}
`;

const serviceSpecFileTemplate = `import { TestBed } from '@angular/core/testing';

import { $fullServiceName } from './$serviceName.service';

describe('$fullServiceName', () => {
  let service: $fullServiceName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject($fullServiceName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});`;

const projectStructure = {
  globalServices: [
    {
      id: "e04de2dc-2c94-44cd-b087-73371abfa771",
      name: "CeGlobalService",
    },
    {
      id: "e04de2dc-2c94-44cd-b087-73371abfa771",
      name: "CeceGlobalService",
    },
    {
      id: "e04de2dc-2c94-44cd-b087-73371abfa771",
      name: "CececeGlobalService",
    },
  ],
  modules: [
    {
      id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
      name: "FirstModule",
      components: [
        {
          id: "deecbaed-c958-4530-8728-005a74543600",
          name: "FfirstComponent",
        },
        {
          id: "deecbaed-c958-4530-8728-005a74543600",
          name: "SsecondComponent",
        },
      ],
      importedModules: [
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "FirstImportedModule",
        },
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "SecondImportedModule",
        },
      ],
      exportedModules: [
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "FirstExportedModule",
        },
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "SecondExportedModule",
        },
      ],
      providedServices: [
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "FirstService",
        },
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "SecondService",
        },
      ],
    },
    {
      id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
      name: "SecondModule",
      components: [
        {
          id: "deecbaed-c958-4530-8728-005a74543600",
          name: "FffirstoComponent",
        },
        {
          id: "deecbaed-c958-4530-8728-005a74543600",
          name: "SssecondoComponent",
        },
      ],
      importedModules: [
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "FirstImportedModule",
        },
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "SecondImportedModule",
        },
      ],
      exportedModules: [
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "FirstExportedModule",
        },
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "SecondExportedModule",
        },
      ],
      providedServices: [
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "FirstService",
        },
        {
          id: "618f3d6f-3653-4707-96a6-1bfd274f74ba",
          name: "SecondService",
        },
      ],
    },
  ],
};

fs.mkdir("src", (err) => {
  if (err) {
    return console.error(err);
  }

  projectStructure.modules?.forEach((module) => {
    const directoryName = module.name.replace("Module", "").toLowerCase();
    fs.mkdir("src/" + directoryName, (err) => {
      if (err) {
        return console.error(err);
      }

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
});

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
    console.log(serviceFileContent)
    if (global) {
      serviceFileContent = serviceFileContent.replace(
        "@Injectable({})",
        `@Injectable({\n\tprovidedIn: 'root'\n})`
      );
  
    console.log(serviceFileContent)
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
