import create from "zustand";
import { devtools } from "zustand/middleware";
interface AppState {
  chosenScaffolder: string;
  modules: IModule[];
  addModule: (module: IModule) => void;
}

export const useStore = create<AppState | any>(
  devtools((set) => ({
    // initial state
    modules: [],
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
            providedServicesNames: [],
          } as IModule,
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
    addImportedModuleToModule: (
      moduleToImport: IModule,
      hostingModule: IModule
    ) => {
      set((state: AppState) => {
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.importedModules?.push(moduleToImport);
        return state;
      });
    },
    addExportedModuleToModule: (
      moduleToExport: IModule,
      hostingModule: IModule
    ) => {
      set((state: AppState) => {
        state.modules
          .find((module) => module.id === hostingModule.id)
          ?.exportedModules?.push(moduleToExport);
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
  }))
);
