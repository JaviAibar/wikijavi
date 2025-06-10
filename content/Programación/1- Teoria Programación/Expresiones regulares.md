A(?!B) Negative Lookahead (mirada hacia adelante negativa). La B no la captura, captura aquellas A que NO estén precedidas por B

Ejemplo: AA AB AC, seleccionará la A de AA y la A de AC

# Condicionales

Sigue la clásica estructura if-then-else, con la siguiente sintaxis:


![[Pasted image 20250610163220.png]]
```python
((<condicion-para-then>)|<condicion-para-else>)<aquí puede haber más regex>(?(2)<regex-then>|<regex-else>)
```

Si se da la condición en morado, se buscará por la expresión regular en azul, si se da la condición en "rosa" se buscará por la expresión regular en naranja. El ?(2) indica que está comprobando si existe la condición en morado, que está siendo capturada por el grupo 2, en cuyo caso busca en la parte que tiene justo a su derecha, en caso contrario, la que está tras la barra vertical.

Ejemplo:
![[Pasted image 20250610163228.png]]
((a)|b)(?(2)A|B)

Esta expresión capturará lo siguiente

aA y bB, pero no aB ni bA

Para cuando tienes problemas con carácteres Unicode usa esta regex `[^\x00-\x7f]`
# Keywords

Regexp