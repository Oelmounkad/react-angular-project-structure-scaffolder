interface IModule {
    id: string;
    name: string;
    components?: IComponent[];
    importedModules?: IModule[];
    exportedModuleNames?: string[];
    providedServicesNames?: string[];
  }

  interface IComponent {
    id: string;
    name: string;
  }