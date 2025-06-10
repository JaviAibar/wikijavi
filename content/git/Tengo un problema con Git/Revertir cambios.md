Existen dos formas de verlo, de bajo y alto nivel. Nos centraremos en alto nivel

Existen para ello, dos comandos `git reset` y `git revert`

`git reset` deshace los cambios moviendo la referencia de una rama hacia atrás en el tiempo a un commit anterior

Sin embargo esto no funciona para ramas remotas.

para ello usamos `git revert <commit>`


| ![[Pasted image 20250420200710.png]] | git reset HEAD~1 | ![[Pasted image 20250420200721.png]] |
| ------------------------------------ | ---------------- | ------------------------------------ |
|                                      |                  |                                      |
