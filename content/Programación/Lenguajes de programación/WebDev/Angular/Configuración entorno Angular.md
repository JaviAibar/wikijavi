Debes tener instalado [[NodeJS]]
El proyecto debe tener un `package.json` (de [[NodeJS]]) donde estarán las dependencias para que se instalen

Este es el que ofrece el equipo de Angular
```json
{
  "name": "angular.dev",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "NG_BUILD_PARALLEL_TS=0 ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/compiler": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/forms": "^18.0.0",
    "@angular/platform-browser": "^18.0.0",
    "@angular/router": "^18.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.0.1",
    "@angular/cli": "^18.0.0",
    "@angular/compiler-cli": "^18.0.0",
    "@types/jasmine": "~5.1.0",
    "@types/node": "^16.11.35",
    "copyfiles": "^2.4.1",
    "jasmine-core": "~5.3.0",
    "jasmine-marbles": "~0.9.2",
    "jasmine-spec-reporter": "~7.0.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "protractor": "~7.0.0",
    "ts-node": "~10.9.0",
    "typescript": "~5.5.0"
  }
}
```
