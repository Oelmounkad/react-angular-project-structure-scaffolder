
/** Filtering methods */

export const filteredImportedModulesToShow = (module: IModule, currentModule: IModule): boolean => {
    return (
      module.name !== currentModule.name &&
      !currentModule.importedModules?.map((module: IModule) => module.id)
        .includes(module.id)
    );
  };

  export const filteredExportedModulesToShow = (module: IModule, currentModule: IModule): boolean => {
    return (
      module.name !== currentModule.name &&
      !currentModule.exportedModules?.map((module: IModule) => module.id)
        .includes(module.id)
    );
  };