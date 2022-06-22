interface IModule {
    id: string;
    nestedId?: string;
    name: string;
    components?: IComponent[];
    importedModules?: IModule[];
    exportedModules?: IModule[];
    providedServices?: IService[];
  }

  interface IComponent {
    id: string;
    name: string;
  }

  interface IService {
    id: string;
    name: string;
  }