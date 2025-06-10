Permite que el software acepte más fácilmente las mejoras y tendrá muchas más posibilidades de sobrevivir y prosperar intacto durante años.

Es un conjunto de ideas, principios y patrones que ayudan a diseñar sistemas de software basados en el modelo subyacente del dominio del negocio. El DDD tiene dos espacios distintos, el espacio del problema y el espacio de la solución.

En el espacio del problema, se define la estructura a gran escala del sistema con patrones estratégicos, que se centran en el análisis de un dominio, subdominios y lenguaje ubicuo.

Mientras que en el espacio de la solución, se adoptan patrones tácticos. Estos patrones incluyen el contexto delimitado, el mapeo de contexto, las entidades, los agregados, los eventos de dominio, los servicios de dominio, los servicios de aplicación y la infraestructura. Estos patrones tácticos le ayudarán a diseñar microservicios que estén débilmente acoplados y cohesionados

Contraejemplo:

Problema: Un registro en una aplicacion SaaS

Solución: Una clase Cliente, que tiene un método CrearCliente

  

El método SignUpForSaaSSubscription reflejaría mejor la intención

# Implementación

Por lo que tengo entendido el DDD no define ninguna implementación explícita, es decir, comprende diversas opciones, pero no se cierra a que puedas desarrollar tus propias implementaciones teniendo en mente la forma de funcionar del DDD (es decir, teniendo en cuenta el dominio).

Las implementaciones más comunes que he encontrado son:

* en forma de cebolla (Onion Architecture)

![[Pasted image 20250610134715.png]]

* en forma de capas (N-Layer Architecture)

![[Pasted image 20250610135106.png]]

Cada una de estas implementaciones tiene sus peculiaridades, que habría que ver específicamente, pero no tienen tanto que ver con el DDD, sino con esa implementación concreta.

## Dependencia dentro de un modelo DDD (aplicado a por capas)

![[Pasted image 20250610135223.png]]

## Dependencias en la arquitectura cebolla

Parece que siempre es de fuera hacia adentro

![[Pasted image 20250610135234.png]]

# Bibliografía

[https://codigoencasa.com/domain-driven-design/](https://codigoencasa.com/domain-driven-design/) 

[http://xurxodeveloper.blogspot.com/2014/01/ddd-la-logica-de-dominio-es-el-corazon.html](http://xurxodeveloper.blogspot.com/2014/01/ddd-la-logica-de-dominio-es-el-corazon.html) 

[https://learn.microsoft.com/es-es/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice](https://learn.microsoft.com/es-es/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/ddd-oriented-microservice)

# Keywords

Diseño guiado por el dominio