# string\[index]

```js
var str = "HELLO WORLD";  
str.charAt(0);            // returns H
str[0];                   // returns H
```

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

#WIP 

# Bibliografía

https://www.w3schools.com/js/js_es5.asp