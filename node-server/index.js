
const fs = require('fs');


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
export class $moduleName { }`


const projectStructure = {
    modules: [
        {
          id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
          name: 'FirstModule',
          components: [
            {
              id: 'deecbaed-c958-4530-8728-005a74543600',
              name: 'FirstComponent'
            },
            {
                id: 'deecbaed-c958-4530-8728-005a74543600',
                name: 'SecondComponent'
            }
          ],
          importedModules: [
            {
              id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
              name: 'FirstImportedModule',
            },
            {
              id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
              name: 'SecondImportedModule',
            },
          ],
          exportedModules: [
            {
              id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
              name: 'FirstExportedModule',
            },
            {
              id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
              name: 'SecondExportedModule',
            },
          ],
          providedServices: [
            {
              id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
              name: 'FirstService',
            },
            {
              id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
              name: 'SecondService',
            },
          ]
        },
        {
            id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
            name: 'SecondModule',
            components: [
              {
                id: 'deecbaed-c958-4530-8728-005a74543600',
                name: 'FirstoComponent'
              },
              {
                  id: 'deecbaed-c958-4530-8728-005a74543600',
                  name: 'SecondoComponent'
              }
            ],
            importedModules: [
              {
                id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
                name: 'FirstImportedModule',
              },
              {
                id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
                name: 'SecondImportedModule',
              },
            ],
            exportedModules: [
              {
                id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
                name: 'FirstExportedModule',
              },
              {
                id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
                name: 'SecondExportedModule',
              },
            ],
            providedServices: [
              {
                id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
                name: 'FirstService',
              },
              {
                id: '618f3d6f-3653-4707-96a6-1bfd274f74ba',
                name: 'SecondService',
              },
            ]
          },
      ],
}


fs.mkdir('src', (err) => {
    if (err) {
        return console.error(err);
    }

    projectStructure.modules.forEach((module) => {

        const directoryName = module.name.replace('Module','').toLowerCase();
        fs.mkdir('src/' + directoryName, (err) => {
            if (err) {
                return console.error(err);
            }
          createModuleFile('src/' + directoryName, module)

        });

    });

  });


  const createModuleFile = (directoryName = '', module = '') => {

    const fileName = module.name.replace('Module','').toLowerCase()+'.module.ts';

    fs.appendFile( directoryName+'/'+ fileName, getModuleFileContentFromTemplate(module), err => {
      if(err) {
          return console.log(err);
      }
  }); 
  }

  const getModuleFileContentFromTemplate = (module) => {
    const declaredComponents = module.components.map((component) => `\t${component.name}`).join(',\n');
    const componentsImports = module.components.map((component) => `import { ${component.name} } from './${component.name.replace('Component','').toLowerCase()}.component.ts';\n`).join('');
    const importedModules = module.importedModules.map((module) => `\t${module.name}`).join(',\n');
    const exportedModules = module.exportedModules.map((module) => `\t${module.name}`).join(',\n');
    const providedServices = module.providedServices.map((service) => `\t${service.name}`).join(',\n');
    
    return moduleFileTemplate
    .replace('$moduleName',module.name)
    .replace('$declaredComponents',declaredComponents)
    .replace('$componentImports',componentsImports)
    .replace('$importedModules',importedModules)
    .replace('$exportedModules',exportedModules)
    .replace('$providedServices',providedServices);
  }
