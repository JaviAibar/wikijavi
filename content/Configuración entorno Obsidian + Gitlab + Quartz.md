Obsidian es el software para tomar notas que uso para WikiJavi.

Quartz entonces convierte los archivos `.md` generados en Obsidian y los convierte en una web estática (HTML + CSS).

Entonces mediante un commit se suben los cambios a [Gitlab](https://gitlab.com/JaviAib/wikijavi).

Entonces Gitlab ejecuta automáticamente unos procesos (Pipelines CI/CD) que son los que ejecutan Quartz y copian los archivos a la carpeta correspondiente
