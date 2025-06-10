# Tengo un problema con JQuery

## Uncaught ReferenceError: $ is not defined

Probablemente hayas puesto el script de JQuery ==despues== del script en el que es usado

_Ejemplo con error_
```html
<script src="js/util.js"></script>
<script src="js/jquery.min.js"></script>  
```

_Ejemplo solucionado_
```html
<script src="js/jquery.min.js"></script>  
<script src="js/util.js"></script>
```
# Bibliografía

https://stackoverflow.com/questions/2075337/uncaught-referenceerror-is-not-defined