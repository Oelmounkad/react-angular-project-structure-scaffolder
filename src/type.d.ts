interface IModule {
    id: string;
    name: string;
    components?: IComponent[];
    importedModuleNames?: string[];
    exportedModuleNames?: string[];
    providedServicesNames?: string[];
  }

  interface IComponent {
    id: string;
    name: string;
  }