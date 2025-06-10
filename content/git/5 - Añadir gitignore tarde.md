Con esta sola línea `git rm -r --cached . && git add . && git commit -am "Remove ignored files"`

> [!Note] ¿Cómo funciona?
Primero deja de trackear TODOS los archivos, luego trackea aquellos que no estén en el gitignore y por último crea el commit sin los archivos