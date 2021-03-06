import create from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuid} from 'uuid'
interface AppState {
  chosenScaffolder: string;
  modules: IModule[];
  globalServices: IService[];
}

export const useStore = create<AppState | any>(
  devtools((set) => ({
    // initial state
    modules: [],
    globalServices: [],
    chosenScaffolder: "angular",

    // Reducers

    updateScaffolder: (scaffolder: string) => {
      set((state: AppState) => ({
        ...state,
        chosenScaffolder: scaffolder,
      }));
    },

    addModule: (module: IModule) => {
      const { id, name } = module;
      set((state: AppState) => ({
        modules: [
          ...state.modules,
          {
            id,
            name,
            components: [],
            exportedModules: [],
            importedModules: [],
            providedServices: [],
          } as IModule,
        ],
      }));
    },

    addGlobalService: (service: IService) => {
      const { id, name } = service;
      set((state: AppState) => ({
        globalServices: [
          ...state.globalServices,
          {
            id,
            name
          } as IService,
        ],
      }));
    },

    addComponentToModule: (moduleId: string, component: IComponent) => {
      set((state: AppState) => {
        state.modules
          .find((module) => module.id === moduleId)
          ?.components?.push(component);
        return {
          ...state,
        };
      });
    },
    addProvidedServiceToModule: (moduleId: string, service: IService) => {
      set((state: AppState) => {
        state.modules
          .find((module) => module.id === moduleId)
          ?.providedServices?.push(service);
        return {
          ...state,
        };
      });
    },
    removeComponentFromModule: (moduleId: string, componentId: string) => {
      set((state: AppState) => {
        const index = state.modules
          .find((module) => module.id === moduleId)
          ?.components?.findIndex(
            (component) => component.id === componentId
          ) as number;
        state.modules
          .find((module) => module.id === moduleId)
          ?.components?.splice(index, 1);
        return {
          ...state,
        };
      });
    },
    removeModule: (moduleId: string) => {
      set((state: AppState) => {
        /** removes the module from imports and exports in other modules */
        state.modules.forEach((module) => {
          module.importedModules = module.importedModules?.filter(
            (module) => module.id !== moduleId
          );
          module.exportedModules = module.exportedModules?.filter(
            (module) => module.id !== moduleId
          );
        });
        // Removes the modules from the list
        return {
          modules: state.modules.filter((module) => module.id !== moduleId),
        };
      });
    },
    removeGlobalService: (serviceId: string) => {
      set((state: AppState) => {
        // Removes the service from the list
        return {
          globalServices: state.globalServices.filter((service) => service.id !== serviceId),
        };
      });
    },
    addImportedModuleToModule: (
      moduleToImport: IModule,
      hostingModule: IModule
    ) => {
      const { id , name } = moduleToImport;
      set((state: AppState) => {
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.importedModules?.push({id, name, nestedId: uuid()});
        return state;
      });
    },
    addExportedModuleToModule: (
      moduleToExport: IModule,
      hostingModule: IModule
    ) => {
      const { id , name } = moduleToExport;
      set((state: AppState) => {
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.exportedModules?.push({id, name, nestedId: uuid()});
        return state;
      });
    },
    removeImportedModuleFromModule: (
      moduleToRemove: IModule,
      hostingModule: IModule
    ) => {
      set((state: AppState) => {
        const index = state.modules
          .find((module) => module.id === hostingModule.id)
          ?.importedModules?.findIndex(
            (module) => module.name === moduleToRemove.name
          ) as number;
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.importedModules?.splice(index, 1);

        return {
          ...state,
        };
      });
    },
    removeExportedModuleFromModule: (
      moduleToRemove: IModule,
      hostingModule: IModule
    ) => {
      set((state: AppState) => {
        const index = state.modules
          .find((module) => module.id === hostingModule.id)
          ?.exportedModules?.findIndex(
            (module) => module.name === moduleToRemove.name
          ) as number;
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.exportedModules?.splice(index, 1);

        return {
          ...state,
        };
      });
    },
    removeProvidedServiceFromModule: (
      serviceToRemove: IService,
      hostingModule: IModule
    ) => {
      set((state: AppState) => {
        const index = state.modules
          .find((module) => module.id === hostingModule.id)
          ?.providedServices?.findIndex(
            (service) => service.name === serviceToRemove.name
          ) as number;
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.providedServices?.splice(index, 1);

        return {
          ...state,
        };
      });
    },
  }))
);
