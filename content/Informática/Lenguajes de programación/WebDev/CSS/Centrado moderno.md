El padre: text-align: center

El hijo: position: inline-block

https://jsfiddle.net/Javi_/t4w69ad8/1/

```html
<div class="padre">
  <div class="hijo">
    <div class="prueba"></div>
  </div>
</div>
```

```css
.padre {
  text-align: center;
}

.hijo {
  display: inline-block
}

.prueba {
  border: 1px red solid;
}
```