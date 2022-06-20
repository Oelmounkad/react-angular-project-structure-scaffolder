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

const projectStructure = {
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

  projectStructure.modules.forEach((module) => {
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
        // generating provided services
      })

    });
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
