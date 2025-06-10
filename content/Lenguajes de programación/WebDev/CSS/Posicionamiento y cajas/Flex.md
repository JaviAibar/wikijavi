#WIP 

![[/zz Media/Pasted image 20240802161354.png]]


El contenedor deberá tener `display: flex{:css}`

```css
.flex-container {
	display: flex;
}
```

Podemos tener varios contenedores con display flex y, por defecto, se alinearán

```css
.flex-container {
	display: flex;
}

.flex-container2 {
	display: flex;
}
```

Si al primer container le ponemos `justify-content: space-between{:css}` se distribuirá el total del ancho de la página entre los dos contenedores

# Tengo un problema

## Mi imagen se ha aplastado

Puedes resolver eso con `align-items: center;{:css}`


# Bibliografía

https://web.dev/learn/css/flexbox?hl=es 