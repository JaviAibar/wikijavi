Manual basado en [v18](https://angular.dev/tutorials/learn-angular/3-composing-components)

## Config entorno

En [[Configuración entorno Angular]]

## Intro

Se basa en componentes de 3 partes:
- TypeScript class
- HTML template
- CSS styles

## Interpolación
Se hace con `{{ expresion }}`

```js
template: `Hello {{ city }}, {{ 1 + 1 }}`,
// city es una variable
```

## Componente

Para crear uno automáticamente se tiene que ejecutar
```shell
ng generate component home
```
Este comando generará una carpeta llamada `home` con un archivo `home.component.ts`

Es un css y una clase TypeScript con:

- selector: el nombre
- template: el html / la vista
- standalone indica si el componente requiere un NgModule

En el export podemos indicar valores (entiendo que por defecto) de los que luego dispondrá el componente

_home.component.ts_
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `<p>home works!</p>`,
  styles: ``
})
export class HomeComponent {}
```

Usando ese selector (e importando la clase en 'imports' sería)

_app.component.ts_
```ts
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  template: `<app-home />`,
  standalone: true,
  imports: [MiComponente],
})
```

## Interfaces

En el contexto de angular, se refiere a tipo de dato

Se crea con el comando ng

```shell
ng generate interface housinglocation
``` 

## Input

Los input son la forma en la que se pasa info de padres a hijos

> [!INFO] Es necesario importarlo

_housing-location.component.ts_
```ts
import {Component, Input} from '@angular/core';
```

Luego se pasa la info desde el template así
La parte entre corchetes es el nombre "key" que espera el componente app-housing-location. housingLocationVar es el "value" que recibe el componente

_home.component.ts_
```html
<app-housing-location [housingLocation]="housingLocationVar"></app-housing-location>
```

`housingLocationVar` es un objeto que hemos creado en el `export`

_home.component.ts_
```ts
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocationVar: HousingLocation = {
    id: 9999,
    name: 'Test Home',
    city: 'Test city',
    state: 'ST',
    photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };
}
```

## ngFor

La parte entre corchetes es el nombre "key" que espera el componente app-housing-location. housingLocationUnit es el elemento actual de la lista, el "value" que recibe el componente

_home.component.ts_
```html
<app-housing-location
    *ngFor="let housingLocationUnit of housingLocationList"
    [housingLocation]="housingLocationUnit">
</app-housing-location>
```

## Servicios e Inyección de Dependencias

Un servicio es un proveedor de funciones que debe poder ser inyectado y usado por varios componentes diferentes. Los servicios son las dependencias de los componentes. Es decir, los componentes dependen de los servicios (nunca al revés). Componentes = alto nivel, Servicios = Bajo nivel

### Crear el servicio

Para crear un servicio (sin tests)

```shell
ng generate service housing --skip-tests
```

Hemos añadido los datos y métodos en la clase
_housing.service.ts_
```ts
export class HousingService {

	housingLocationList: HousingLocation[] = [
	    {
	      id: 0,
	      name: 'Acme Fresh Start Housing',
	      ...
	    },
	    ...
	];
	getAllHousingLocations(): HousingLocation[] {
	    return this.housingLocationList;
	}
	
	getHousingLocationById(id: number): HousingLocation | undefined {
	    return this.housingLocationList.find((housingLocation) => housingLocation.id === id);
	}

	constructor() { }
}
```

### Componente

Ahora hay que inyectar y usar el servicio

Importar el `inject` (y demás dependencias que hubiese, en este caso HousingLocation)

_home.component.ts_
```ts
import { Component, inject } from '@angular/core';
```

Importar el servicio

_home.component.ts_
```ts
import {HousingService} from '../housing.service';
```

Y usarlo en la clase

_home.component.ts_
```ts
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = []

  
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
```

Creo que `main.ts` importa el objeto `routerConfig` y se lo pasa al proveedor para que lo procese. Por una parte le pasa todos lo 
## Rutas Routes Routing Rutear

### Configuración
Se crea un archivo `routes.ts` en la carpeta `app` donde pondremos las rutas

En `main.ts` debemos importar `router`
Aprovechamos para importar `routes.ts` aunque todavía dará error por no ser un módulo

_main.ts_
```ts
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
```

y en el mismo archivo, debemos incluir al `bootstrap` el proveedor con `provideRouter(routeConfig)`

_main.ts_
```ts
bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
```

Importamos el `modulo Router` al `componente App`

_app.component.ts_
```ts
import {RouterModule} from '@angular/router';
```

Lo añadimos a las dependencias de `app`

_app.component.ts_
```ts
imports: [HomeComponent, RouterModule],
```

debemos sustituir `\<app-home>` del `template` por `<router-outlet>`

_app.component.ts_
```html
<section class="content">
    <router-outlet />
</section>
```

> [!NOTE] Opcional
> Y convertimos la imagen en un enlace para poder volver a home
> 
>  _app.components.ts_
 ```ts
 <a [routerLink]="['/']">
  <header class="brand-name">
	<img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
  </header>
</a>
```
 

En el archivo que creamos al inicio de esta sección `routes.ts`, importamos el router y los componentes que harán de páginas

_routes.ts_
```ts
import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
```

Y definimos las rutas `/` y `/details/9999`

_routes.ts_
```ts
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
];
export default routeConfig;
```

### Navegación dinámica

Le hemos añadido un `'details/:id'` pero ahora debemos crear un botón para que nos lleve al id correspondiente

_housing-location.component.ts_
```ts
<a [routerLink]="['/details', housingLocation.id]">Learn More</a>
```

pero debemos importar dos cosas

_housing-location.component.ts_
```ts
import {RouterModule, RouterLink} from '@angular/router';
```

Y añadir `RouterLink` a las dependencias del componente

_housing-location.component.ts_
```ts
  imports: [CommonModule, RouterLink],
```

### Obtener info del router

El componente al que vas debe recibir info, en este caso, cuál es el id de la casa seleccionada

Ese dato lo proporciona el servicio `ActivatedRoute`, que podemos inyectar de la siguiente forma

_details.component.ts_
```ts
route: ActivatedRoute = inject(ActivatedRoute);
```

Y accedemos al dato a través de lo siguiente

_details.component.ts_
```ts
this.route.snapshot.params['id']
```

> [!Info] Los datos vienen en string
> Por lo que ellos lo convierten a número con `Number(this.route.snapshot.params['id']);`pero evidentemente no es obligatorio

## Formularios

Para el ejemplo, se va a imprimir los datos de un formulario en details por consola usando un método del servicio que ya tenemos

_housing.service.ts_
```ts
submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
```

Importamos toda la mandanga de formularios

_details.component.ts_
```ts
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

imports: [CommonModule, ReactiveFormsModule],
```

> [!note] FormGroup y FormControl
> Se trata de tipos de dato para manejar formularios. Representa los diferentes campos

Añadimos la variables de formulario con sus campos en la clase DetailsComponent, justo antes del contructor

_details.components.ts_
```ts
applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
```

Y después del contructor, ponemos el `submit`

_details.component.ts_
```ts
submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
```

Ahora añadimos el html
Especial atención a que hemos puesto applyForm (el nombre de nuestra variable) en el formGroup, el submit va entre parentesis porque es un evento

_details.component.ts_
```html
<form [formGroup]="applyForm" (submit)="submitApplication()">
  <label for="first-name">First Name</label>
  <input id="first-name" type="text" formControlName="firstName" />
  <label for="last-name">Last Name</label>
  <input id="last-name" type="text" formControlName="lastName" />
  <label for="email">Email</label>
  <input id="email" type="email" formControlName="email" />
  <button type="submit" class="primary">Apply now</button>
</form>
```

## Funcionalidad de búsqueda

Vamos a añadir una variable de plantilla (template variable) `#filter` en el input

_home.component.ts_
```ts
<input type="text" placeholder="Filter by city" #filter />
```

Esa variable nos permitirá acceder al valor desde el propio template

_home.component.ts_
```ts
<button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
```

Implementamos el método filterResults

```ts
filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
```

Si lo dejamos así, cuando pulsemos enter se recargará la página y, por tanto, perderá la búsqueda. He abordado el tema en [[#Al pulsar enter en un input se recarga la página]]

Por supuesto ahora tienes que cambiar la lista mostrada a la que está filtrada

_home.component.ts_
```ts
<app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
```

## Datos

Parece ser que `RouterModule` incluye tanto `RouterLink` como `RouterOutlet`. Entiendo que es una buena práctica que solo importes como dependencia el que necesites y no ambos (es decir, importando `RouterModule`)

## Tengo un problema

### Al pulsar enter en un input se recarga la página

Si lo dejamos así, cuando pulsemos enter se recargará la página y, por tanto, perderá la búsqueda
Aparentemente esto se debe a que el form se encarga del evento antes que \<input>. Una solución es permitir al propio input gestionar el evento (nótese que ahora pasamos `$event`)

```ts
<input (keydown.enter)="filterResults($event, filter.value)" type="text" placeholder="Filter by city" #filter />

<button class="primary" type="button" (click)="filterResults($event, filter.value)">Search</button>
```

y en el método hacemos `preventDefault()`

```ts
filterResults(event: Event, text: string) {
    event.preventDefault();
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
```
## Cosas raras

La exclamación le indica al compilador de TS que, no debe ser null, a esa exclamación se la llama el [non-null assertion operator](https://www.omarileon.me/blog/typescript-non-null-assertion)

_housing-location.component.ts_
```ts
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
```
