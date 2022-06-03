interface IModule {
    id: string;
    name: string;
    components?: IComponent[];
    importedModules?: IModule[];
    exportedModules?: IModule[];
    providedServicesNames?: string[];
  }

  interface IComponent {
    id: string;
    name: string;
  }