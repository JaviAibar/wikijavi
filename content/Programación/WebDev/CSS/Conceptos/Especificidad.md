En este orden

| universal                   | *                                       | 0p     |
| --------------------------- | --------------------------------------- | ------ |
| elementos y pseudoelementos | div / ::selection                       | 1p     |
| clase, pseudoclase o attr   | .clase / :hover / \[href='#']           | 10p    |
| id                          | \#id                                    | 100p   |
| inline                      | `<div style="color: red"></div>{:html}` | 1000p  |
| !important                  | !important                              | 10000p |

Si quieres mejorar la puntuación, puedes duplicar


```css
.my-button.my-button {  /* 20p */
	background: blue;
}

.my-button {            /* 10p */
	background: red;
}

/* Resultado: Fondo azul */
```

En igualdad de puntos, el que más abajo aparezca, prevalece

```css
.my-button {            /* 10p */
	background: blue;
}

.my-button {            /* 10p */
	background: red;
}

/* Resultado: Fondo rojo */
```

# Bibliografía

https://web.dev/learn/css/specificity?hl=es