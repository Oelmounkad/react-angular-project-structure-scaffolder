
const fs = require('fs');


const moduleFileTemplate = `import { NgModule } from '@angular/core';\nimport { BrowserModule } from '@angular/platform-browser';\n$componentImports\n@NgModule({\ndeclarations: [\n$declaredComponents\n],\n})\nexport class $moduleName { }`


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
    const declaredComponents = module.components.map((component) => component.name).join(',\n');
    return moduleFileTemplate.replace('$moduleName',module.name).replace('$declaredComponents',declaredComponents)
  }
