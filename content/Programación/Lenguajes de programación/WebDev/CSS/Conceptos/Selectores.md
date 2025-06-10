.clase
\#id
::pseudoelemento (::selection)
:pseudoclase (:hover)
\[atributo] (\[onclick])

varios a la vez (aplica a los strong, a los em, la clase my-class y los que contengan la clave lang)
```css
strong,
em,
.my-class,
[lang] {
  color: red;
}
```

```css
p > strong { color: blue; }
```
Solo para los descendientes directos de p que sean strong

```css
p strong { color: blue; }
```
para cualquier descendiente aunque no sea directo
# Bibliografía
https://web.dev/learn/css/selectors?hl=es