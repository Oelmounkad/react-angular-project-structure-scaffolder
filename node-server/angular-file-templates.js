const moduleFileTemplate = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
$componentImports
@NgModule({
declarations: [
$declaredComponents
],
imports: [
$importedModules
],
exports: [
$exportedModules
],
providers: [
$providedServices
],
})
export class $moduleName { }`;

const componentTsFileTemplate = `import { Component } from '@angular/core';

@Component({
  selector: '$componentName',
  templateUrl: './$componentName.component.html',
  styleUrls: ['./$componentName.component.css']
})

export class $fullComponentName { }`;

const componentHtmlFileTemplate = `<p>$componentName works!</p>`;

const serviceTsFileTemplate = `import { Injectable } from '@angular/core';

@Injectable({})
export class $fullServiceName {

  constructor() { }
}
`;

const serviceSpecFileTemplate = `import { TestBed } from '@angular/core/testing';

import { $fullServiceName } from './$serviceName.service';

describe('$fullServiceName', () => {
  let service: $fullServiceName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject($fullServiceName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});`;

exports.moduleFileTemplate = moduleFileTemplate;
exports.componentTsFileTemplate = componentTsFileTemplate;
exports.componentHtmlFileTemplate = componentHtmlFileTemplate;
exports.serviceTsFileTemplate = serviceTsFileTemplate;
exports.serviceSpecFileTemplate = serviceSpecFileTemplate;
