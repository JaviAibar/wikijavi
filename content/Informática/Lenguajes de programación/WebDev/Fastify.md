## Configuración mínima

```js
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
``` 

## Añadir rutas

```js 
fastify.get("/", function (request, reply) {

});
```

```js 
fastify.post("/", function (request, reply) {

});
``` 

> [!note] Otras opciones
> Además de get y post tenemos put y delete. Creo que todas funcionan igual


> [!note] Request y reply
> Para ver como gestionar y responder a la petición se usan request y reply respectivamente

### Request

#WIP 
### Reply

```js 
return reply.view("/src/pages/index.hbs", params);
``` 

> [!warning] View es dependencia
> Para poder usar view debes tener instalado `@fastify/view`

## Vistas

Es obligatorio usar un `engine`. Ejemplo con [[Handlebars]]
```js 
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});
``` 

Una lista de los `engine` que soporta [aquí](https://www.npmjs.com/package/@fastify/view)
## Acceso estático

Para registrar un acceso estatico a archivos se usa `@fastify/static`

```js 
// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});
``` 

para lo cual necesitamos importar `path`

```js 
const path = require("path");
``` 

> [!warning] Static es dependencia
> Para poder usar static debes tener instalado `@fastify/static`
## Configuración de SEO

```js 
// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}
``` 

Luego en los verbos HTML (enrutado), i.e. POST, GET, PUT... se añade

```js 
let params = { seo: seo };


params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo,
    };

return reply.view("/src/pages/index.hbs", params);
``` 

# Bibliografía

https://glitch.com/edit/#!/ash-stump-potato

https://www.npmjs.com/package/@fastify/view