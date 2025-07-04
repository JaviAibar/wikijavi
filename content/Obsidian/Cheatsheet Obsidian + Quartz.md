# Usar colores

en vez de

<code style="color: #ff5454">
rb.AddForce(direction * Time.deltaTime);
</code>

usar

<code style="color: #92ff54">
rb.velocity = characterController.velocity;
</code>
## Enlaces

Tenemos los wikilinks que sirven para referenciar enlaces dentro de la propia wiki, estos se hacen con doble corchete  

```markdown
[[Unity/Ejemplos de Unity/Ejemplo corrutina]]
```

Si queremos referencia dentro de la misma nota, además del doble corchete se usa almohadilla #

```markdown
[[#Configuración en detalle]]
```

En ambos casos, si queremos que cambiar el título del enlace, se usa barra vertical

```markdown
[[#Configuración en detalle|Indicaciones]]
``` 

Imágenes con enlace

```markdown
This is a linked image[![[yourimagename.png]]](<PATH/TO/THE NOTE>)
```

> [!warning] El ejemplo de Unity está roto pero me da pereza corregirlo. Sorry

[![[zz Media/Pasted image 20240731183320.png|100]]](\<Ejemplo corrutina.md>) ^roto


Tanto la imagen como el enlace pueden ser online
```markdown
[![Google logo](https://images.com/Google.jpg)](<http://google.es>)
```

[![Google logo|100](https://c.clc2l.com/t/g/o/google-A7roaL.jpg)](<http://google.es>)

más info en la [web oficial](https://help.obsidian.md/Linking+notes+and+files/Internal+links#:~:text=To%20link%20to%20a%20heading,to%20Preview%20a%20linked%20file.&text=To%20link%20to%20a%20heading%20in%20another%20note%2C%20add%20a,followed%20by%20the%20heading%20text.)

## Highlight (Quartz)

````
```js {1-3,4} 
export function trimPathSuffix(fp: string): string { fp = clientSideSlug(fp) let [cleanPath, anchor] = fp.split("#", 2) anchor = anchor === undefined ? "" : "#" + anchor return cleanPath + anchor}
```
````

```js {1-3,4} 
export function trimPathSuffix(fp: string): string { 
	fp = clientSideSlug(fp) 
	let [cleanPath, anchor] = fp.split("#", 2) 
	anchor = anchor === undefined ? "" : "#" + anchor 
	
	return cleanPath + anchor
}
```
https://quartz.jzhao.xyz/features/syntax-highlighting

## Lenguajes de programación aceptados

https://prismjs.com/#supported-languages

# Notas

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!IMPORTANT] IMPORTANTE! Título personalizado!
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

> [!CAUTION] Cuidado!! Título en español!
> Advises about risks or negative outcomes of certain actions.

> [!importante]- Como hacer bloques de estos que se cierran?
> Poniendo un "-" delante de la selección, es decir `> [!importante]-`

# Enlazar a bloques

Ponemos un bloque y le asignamos con \^ un nombre ^ejemploBloque

> [!warning] El bloque debe estar separado del texto por, al menos, un espacio

Para poder referenciarlo, ponemos un enlace normal seguido de \#^ y el nombre [[Cheatsheet Obsidian + Quartz#^ejemploBloque]]