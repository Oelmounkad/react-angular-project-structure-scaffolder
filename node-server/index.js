
import fs from 'fs'


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

          createModule(module.name)


        });

    });

  });


  const createModule = (str = '') => {
    fs.writeFile("/tmp/test", "Hey there!", function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  }); 
  }
