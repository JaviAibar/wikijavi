### `inherit`

Hace que herede la propiedad del padre, aunque le correspondía otro valor

```css
strong { /* Todas las strong a 900 */
  font-weight: 900;
}
```

```css
.my-component {  
	font-weight: 500;
}
```

```css
.my-component strong { /* pero las que estén en my-componente, siguen a 500 */
  font-weight: inherit;
}
```

### `initial`

Hace que se ponga el valor por defecto

```css
aside strong { /* en lugar de 900, ahora está a 700 (por defecto) */
  font-weight: initial;
}
```

### `unset`

Si propiedad es heredable --> unset = inherit

Si no heredable --> unser = initial

Recordar qué propiedades CSS son heredables puede ser difícil, pero `unset` puede ser útil en ese contexto. Por ejemplo, `color` es heredable, pero `margin` no lo es, por lo que puede escribir esto:

```css
/* Estilos de color globales para párrafos en CSS creado */
p {
  margin-top: 2em;
  color: goldenrod;
}

/* La p debe restablecerse en asides, para que pueda usar unset */
aside p {
  margin: unset;
  color: unset;
}
```

![[../../../../../zz Media/Pasted image 20240808121202.png]]

Ahora, el `margin` se elimina y el `color` vuelve a ser el valor calculado heredado.

# Bibliografía
https://web.dev/learn/css/inheritance?hl=es