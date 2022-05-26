import create from "zustand";

interface AppState {
  modules: IModule[];
  addModule: (module: IModule) => void;
}

export const useStore = create<AppState>((set) => ({
  // initial state
  modules: [],
  // Reducers
  addModule: (module: IModule) => {
    const { id , name } = module;
    set((state) => ({
      modules: [
        ...state.modules,
        {
          id,
          name
        } as IModule,
      ],
    }));
  },
}));
