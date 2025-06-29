Puedes hacer [[2 - git checkout|checkout]] a un commit usando el hash. pero también puedes utilizar solo parte del hash, lo suficiente para que sea unívoco

ejemplo

Si el commit tiene un hash como `f2delkfnalk3k2jbtpi239t23b`

podríamos identificarlo como `f2de`, por ejemplo

Para el movimiento relativo, podemos situarnos en un commit en concreto como HEAD o bugFix y hacer:

- Moverse un commit hacia atrás con ^
- Moverse una cantidad de commits hacia atrás con ~\<num>

Ejemplos

main^

main^^

Para forzar / mover a que una rama esté en un punto específico. 

> [!warning] IMPORTANTE
 > para que funcione debes estar en una rama diferente de la que quieres mover

```shell
git checkout <otra-rama> 
git branch -f <rama> HEAD~3
```