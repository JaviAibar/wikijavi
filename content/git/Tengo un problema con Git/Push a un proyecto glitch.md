Glitch tiene, evidentemente, repositorio [[Git bare vs non-bare|non-bare]], por lo que, teoricamente no debería poder recibir un `git push`, sin embargo se puede de la siguiente forma

En el proyecto de glitch.com ejecuta

```shell
git config receive.denyCurrentBranch ignore
```

Eso nos permitirá subir los archivos al .git aunque no sustituirá los archivos reales en Glitch

Por lo que, por supuesto, hacemos el `git push` en el ordenador, nos vamos otra vez a glitch y ejecutamos

```shell
git reset --hard
refresh
```

Esto se puede automatizar con un [[Hook]]