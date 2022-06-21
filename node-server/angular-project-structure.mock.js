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

  exports.projectStructure = projectStructure;