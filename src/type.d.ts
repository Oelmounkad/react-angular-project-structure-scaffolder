interface IModule {
    id: string;
    name: string;
    componentNames?: string[];
    importedModuleNames?: string[];
    exportedModuleNames?: string[];
    providedServicesNames?: string[];
  }

  interface IComponent {
    id: string;
    name: string;
  }