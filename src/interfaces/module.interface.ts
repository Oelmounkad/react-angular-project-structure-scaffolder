export interface Module {
    name: string;
    componentNames: string[];
    importedModuleNames: string[];
    exportedModuleNames: string[];
    providedServicesNames: string[];
}