>[!warning] Antes de comenzar haz un backup

Debería ser simplemente ejecuta este comando `git filter-branch --index-filter 'git rm -rf --cached --ignore-unmatch path_to_file' HEAD`

Eliminará los archivos que están en .gitignore

Sin embargo, esta solución puede traer varios problemas (p.e, liandotela con la historia o creando problemas al resto de compañeros del repo)

Por lo que lo suyo es usar git-filter-repo

## Requisitos

Tener instalado git >= 2.22.0 ciertas cosas requieren git >= 2.24.0

Tener instalado python3 >= 3.5

Descarga [https://github.com/newren/git-filter-repo/releases](https://github.com/newren/git-filter-repo/releases) o de [mi Drive](https://drive.google.com/drive/folders/1LQq6PREo_n7mb4rbI4XVGoEnorVdQDmZ?usp=share_link): Es muy probable que la versión de mi Drive no funcione ya que requiere enlaces simbólicos y no estén, no sé como va. Si no funcionase, debes descargarlo del repositorio (github), ejecutar tu programa de extracción con **permisos de administrador** (Rar / 7Zip o el que tengas) navegar hasta el comprimido y descomprimir, sí, qué fácil...

El enlace llamado `git_filter_repo.py` debe ser copiado a una ruta, en mi caso era `C:\Program Files\Python311\Lib\site-packages`, pero el tuyo podría ser diferente, para saber cuál, ejecuta esto en una consola 
```shell
python -c "import site; print(site.getsitepackages())
```

Pon la **carpeta extraída** en el **Path** (lo que has descargado de **Github**)

Puedes comprobar si ya lo hiciste poniendo en un cmd echo %path%

![[Pasted image 20250420200025.png]]

>[!warning] Si al ejecutar diera el siguiente error
>```
 >No se encontr¾ Python; ejecuta sin argumentos para instalar desde Microsoft Store o deshabilita este acceso directo en Configuraci¾n > Administrar alias de ejecuci¾n de la aplicaci¾n. 
> ```
>Añadir estas rutas (⚠️ puede que tenga que ser en ese orden!):
>
>```
>C:\Program Files\Python311\Scripts\
C:\Program Files\Python311\
>```
>al path de sistema


>[!warning] Si da el error
>`/usr/bin/env: ‘python3’: No such file or directory`
>
>Tan solo hay que ir a la carpeta donde tienes instalado Python, copiar el ejecutable y ponerle de nombre python3.exe, ¿absurdo? Sí, todo este tema lo es



# Comando

El comando para que borre de la historia todos lo archivos que estén listados en .gitignore es (no funciona)

```shell
git filter-repo --path .gitignore --invert-paths
```

Para archivos grandes usando BGF es el siguiente comando

```shell
bfg --strip-blobs-bigger-than 50M 
```

Y después

```shell
git reflog expire --expire=now --all && git gc --prune=now --aggressive
```