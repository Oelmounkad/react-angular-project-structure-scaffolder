const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const { v4 } = require("uuid");
const { zip } = require("zip-a-folder");
const {
  createModuleFile,
  createComponentFiles,
  createServiceFiles,
} = require("./angular-structure-functions");
const {
  getServiceTsFileContentFromTemplate,
  getServiceSpecFileContentFromTemplate,
} = require("./angular-template-filler-functions");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors({origin: '*'}));
app.options('/angular-project-scaffolder', cors())

let port = process.env.PORT || 4000;


app.get('/', (req,res) => {
  res.send('Hello world');
})

app.post("/angular-project-scaffolder", cors(), (req, res) => {
  const projectStructure = JSON.parse(req.body.projectStructure);
  const randomId = v4();
  const src = `src-${randomId}`;
  const zippedSrc = `angular-project-structure-${randomId}.zip`;

  // Creating the project structure

  fs.mkdir(src, (err) => {
    projectStructure.modules?.forEach((module) => {
      const directoryName = module?.name.replace("Module", "").toLowerCase();
      fs.mkdir(src + "/" + directoryName, (err) => {
        createModuleFile(src + "/" + directoryName, module);

        module.components.forEach((component) => {
          createComponentFiles(src + "/" + directoryName, component);
        });

        module.providedServices.forEach((service) => {
          createServiceFiles(src + "/" + directoryName, service);
        });
      });
    });

    projectStructure.globalServices?.forEach((service) => {
      const serviceName = service.name.replace("Service", "").toLowerCase();
      const serviceTsFile = serviceName + ".service.ts";
      const serviceSpecFile = serviceName + ".service.spec.ts";

      fs.appendFile(
        src + "/" + serviceTsFile,
        getServiceTsFileContentFromTemplate(service, true),
        (err) => {}
      );
      fs.appendFile(
        src + "/" + serviceSpecFile,
        getServiceSpecFileContentFromTemplate(service),
        (err) => {}
      );
    });

    zip(src, zippedSrc)
      .then(() => {
        res.download(zippedSrc);
      })
      .catch(() => {
        res.status(400).json({ error: "error getting the file" });
      })
      .finally(() => {
        setTimeout(() => {
          fs.rmSync(zippedSrc, { force: true });
          fs.rmSync(src, { recursive: true, force: true });
        }, 2000);
      });
  });
});

app.listen(port);
