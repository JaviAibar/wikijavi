Estos scripts `.sh` nos permiten automatizar acciones cuando pasa algo en Git

Por ejemplo, puedes hacer que despues de un `git push`, se ejecute automáticamente un comando

Ejemplo para glitch

Dentro de la carpeta `.git`, se crea una llamada `hooks`

Dentro de esta, un archivo llamado `post-receive` con el contenido del script

```sh
#!/bin/sh
git reset --hard
refresh
```

En este caso, como es unix, hay que darle permisos

```bash
chmod +x .git/hooks/post-receive
```