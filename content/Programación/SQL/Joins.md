¿Por qué los ejemplos que salen de LEFT y RIGHT JOIN no son lo mismo que hacer sencillamente `SELECT * FROM A` o `SELECT * FROM B` respectivamente?

Porque añade la info que hay en B

Mejor poner un ejemplo ilustrativo

A = Personas

| Nombre | Edad |
| ------ | ---- |
| Juan   | 45   |
| Luisa  | 32   |


B = Localidades

| Nombre   |
| -------- |
| Valencia |

Juan vive en Valencia, pero Luisa no tiene asignada una localidad

En el resultado al hacer `A LEFT JOIN B` el resultado sería

| Nombre | Edad | Localidad |
| ------ | ---- | --------- |
| Juan   | 45   | Valencia  |
| Luisa  | 32   |           |
Si este mismo ejemplo fuera `INNER JOIN` daría el siguiente resultado

| Nombre | Edad | Localidad |
| ------ | ---- | --------- |
| Juan   | 45   | Valencia  |

7 uniones SQL que debes conocer

  

➡️ Unión interna: recupera registros con valores coincidentes en ambas tablas.

  

➡️ Unión izquierda: recupera todos los registros de la tabla izquierda y los registros coincidentes de la tabla derecha.

  

➡️ Combinación izquierda con comprobación nula: filtra solo los registros en los que no hay ninguna coincidencia en la tabla derecha (valores NULL).

  

➡️ Combinación a la derecha: recupera todos los registros de la tabla derecha y los registros coincidentes de la tabla izquierda.

  

➡️ Combinación derecha con comprobación nula: filtra solo los registros en los que no hay coincidencia en la tabla izquierda (valores NULL).

  

➡️ Unión completa: recupera todos los registros cuando hay una coincidencia en la tabla izquierda o derecha.

  

➡️ Combinación completa con comprobación nula: filtra solo los registros en los que no hay coincidencia ni en la tabla izquierda ni en la derecha (valores NULL).

  

[IT-TALENT Headhunter SENIOR IT](https://www.linkedin.com/company/itthhgroup/)

[Chumi-IT Portal de empleos IT Latam](https://www.linkedin.com/company/chumi-it/)

  

Cortesía imagen [amigoscode.com](http://amigoscode.com/)


![[sql joins.gif]]

![[Pasted image 20250610154016.png]]


# Bibliografía

Aaron Wright  (Cogido de LinkedIn)

Marco Muñoz (Cogido de LinkedIn)

https://www.w3schools.com/sql/

Eleni