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
            exportedModuleNames: [],
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
          .find((module) => module.id === hostingModule.id)?.importedModules?.splice(index, 1);

        return {
          ...state
        };
      });
    },
  }))
);
