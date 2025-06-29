Es lo mismo que el rebase normal pero te permite analizar cuáles son los commits que necesitas, se forma como un rebase normal con el atributo -i

```shell
git rebase -i
```

Una vez hecho esto, se abrirá una UI y tienes 3 posibilidades:

- Reordenar commits
- Elegir ignorar algunos commits (no hacer pick a un commit significa ignorarlo)
- Squashear commits (combinar varios commits en uno solo)

![[Pasted image 20250420192544.png]]

```shell
git rebase -i HEAD~4
```


| ![[Pasted image 20250420192615.png]] | --> | ![[Pasted image 20250420192629.png]] |
| ------------------------------------ | --- | ------------------------------------ |
|                                      |     |                                      |
![[Pasted image 20250420192641.png]]

El rebase de TortoiseGit es siempre interactivo

![[Pasted image 20250420192653.png]]