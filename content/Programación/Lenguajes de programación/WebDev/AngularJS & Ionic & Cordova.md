
# Webs

[Creating and showing pdf in Ionic](https://stackoverflow.com/questions/32434553/creating-and-showing-pdf-in-ionic)
[Register and receive push notifications (deprecated)](https://github.com/phonegap/phonegap-plugin-push)
[angularjs - POST an array of objects(JSON data) to a PHP page](https://stackoverflow.com/questions/28851154/angularjs-post-an-array-of-objectsjson-data-to-a-php-page)
[AngularJS: how to implement a simple file upload with multipart form?](https://stackoverflow.com/questions/13963022/angularjs-how-to-implement-a-simple-file-upload-with-multipart-form)
[Using CocoaPods stops iOS build using ionic Project](https://stackoverflow.com/questions/38584906/using-cocoapods-stops-ios-build-using-ionic-project)
[OneSignal-Cordova-SDK](https://github.com/OneSignal/OneSignal-Cordova-SDK)
[The 9 most common mistakes that Ionic developers make](https://www.techinasia.com/talk/9-common-mistakes-ionic-developers)

# AngularJS

## Que un dato sea estático {{::nombre}}

Por lo poco que he mirado [aquí](http://blog.thoughtram.io/angularjs/2014/10/14/exploring-angular-1.3-one-time-bindings.html) los dos puntos dentro de la expresión hacen que sea imposible cambiar el primer dato que toma del controller, es decir:


```js
$scope.nombre = "Javi";

 
function cambiarNombre() {
    $scope.nombre = "prueba";
}
``` 

pese a ejecutar la funcion de arriba, el nombre siempre será Javi


## ng-class

Va con un corchete

ng-class="{'nombre-clase': expresion}" --> Si expresión es true, se aplica 'nombre-clase' en la clase de ese elemento

ng-class="variable" --> Apartentemente evalúa que una variable no sea undefined (o similares) y en tal caso, aplica el texto que en ella se contenga

## Como pasar un objeto por params (no hay error, entra en el método, pero la vista no se aplica)

Cuando le pasas un objeto por params de state, se le pone por defecto null, ya que undefined es como si no existiera, y se ralla.

```js 
.state('estado', {
        url: '/urlEstado',
        templateUrl: 'templates/estado.html',
        controller: 'estadoCtrl',
        params: {
            parametro: null
        }
        ``` 

# ionic

## Actualizar plataformas

  

Ejecutar este comando que desinstalará y volverá a instalar la plataforma (en este caso Android) pero con los nuevos plugins

```shell
ionic platform update android
```

## Vista dinámica

  

$ionicScrollDelegate tiene una función que permite el recalculado del tamaño de la vista -> $ionicScrollDelegate.resize();