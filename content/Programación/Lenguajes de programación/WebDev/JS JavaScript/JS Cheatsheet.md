# string\[index]

```js
var str = "HELLO WORLD";  
str.charAt(0);            // returns H
str[0];                   // returns H
```

# interpolación string / Template literals / plantilla literales

```js 
`string text`

`string text line 1
 string text line 2`

`string text ${expression} string text`

tagFunction`string text ${expression} string text`
``` 

> [!note] tagFunction
> Se refiere a que puedes pasarle una función, su return será lo que rellene el string. En este ejemplo, harías una función llamada tagFunction que devuelve una variable llamada expression


# trim

```js
var str = "       Hello World!        ";  
alert(str.trim());
```

Array map

```js
var numbers1 = [45, 4, 9, 16, 25];  
var numbers2 = numbers1.map(myFunction);  
  
function myFunction(value) {  
  return value * 2;  
}
```

# Esperar que cargue el DOM

```javascript
const log = document.querySelector(".event-log-contents");
const reload = document.querySelector("#reload");

reload.addEventListener("click", () => {
  log.textContent = "";
  setTimeout(() => {
    window.location.reload(true);
  }, 200);
});

window.addEventListener("load", (event) => {
  log.textContent += "load\n";
});

document.addEventListener("readystatechange", (event) => {
  log.textContent += `readystate: ${document.readyState}\n`;
});

document.addEventListener("DOMContentLoaded", (event) => {
  log.textContent += "DOMContentLoaded\n";
});

// Resultado:
/*
readystate: interactive
DOMContentLoaded
readystate: complete
load
*/
```


# Array filter

```js
var numbers = [45, 4, 9, 16, 25];  
var over18 = numbers.filter(myFunction);  
  
function myFunction(value) {  
  return value > 18;  
}
```

# let

Solo para el bloque

```js
var x = 10;  
// Here x is 10  
{  
  let x = 2;  
  // Here x is 2  
}  
// Here x is 10
```

# Promesa (Promise)

Es una función asincrónica, se resolverá cuando haya finalizado el trabajo
```js
const myPromise = new Promise(function(myResolve, myReject) {
  if (Date.now() & 1) { // Si es impar, se considera fallido
  	setTimeout(function(){ 
	  	myReject("It's me not you..."); }
	, 3000);
  } else { 
  	setTimeout(function(){ 
	  	myResolve("I love You !!"); }
	, 3000);
  }
});
```

```js
myPromise.then(function(value) {
	document.getElementById("demo").innerHTML = value;
}).catch(function(error) {
	document.getElementById("demo").innerHTML = error;
});

document.getElementById("demo").innerHTML = "Prueba";
```

> [!warning] Cuidado!
> Tienen que ir en orden

> [!Note] Atención
> Primero se mostrará "Prueba" y a los 3 segundos (cuando se complete el setTimeout), se sustituirá por el resultado


# Para obtener valor de un Toggle / check / casilla de verificación / switch / interruptor

```js 
toggle.checked
``` 

```js 
const toggle = document.getElementById("miToggle");

const valor = toggle.checked ? toggle.value : 0;
console.log(valor);
```


#WIP 

# Bibliografía

https://www.w3schools.com/js/js_es5.asp