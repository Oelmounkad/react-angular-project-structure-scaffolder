const {
  moduleFileTemplate,
  componentTsFileTemplate,
  componentHtmlFileTemplate,
  serviceTsFileTemplate,
  serviceSpecFileTemplate,
} = require("./angular-file-templates");

const getModuleFileContentFromTemplate = (module) => {
  const declaredComponents = module?.components
    .map((component) => `\t${component.name}`)
    .join(",\n");
  const componentsImports = module?.components
    .map(
      (component) =>
        `import { ${component.name} } from './components/${component.name
          .replace("Component", "")
          .toLowerCase()}.component.ts';\n`
    )
    .join("");
  const importedModules = module?.importedModules
    .map((module) => `\t${module.name}`)
    .join(",\n");
  const exportedModules = module?.exportedModules
    .map((module) => `\t${module.name}`)
    .join(",\n");
  const providedServices = module?.providedServices
    .map((service) => `\t${service.name}`)
    .join(",\n");

  return moduleFileTemplate
    .replace("$moduleName", module?.name)
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

exports.getModuleFileContentFromTemplate = getModuleFileContentFromTemplate;
exports.getComponentTsFileContentFromTemplate =
  getComponentTsFileContentFromTemplate;
exports.getComponentHtmlFileContentFromTemplate =
  getComponentHtmlFileContentFromTemplate;
exports.getServiceTsFileContentFromTemplate =
  getServiceTsFileContentFromTemplate;
exports.getServiceSpecFileContentFromTemplate =
  getServiceSpecFileContentFromTemplate;
