[Obsidian](https://obsidian.md/) es el software para tomar notas que uso para WikiJavi.

[Quartz](https://quartz.jzhao.xyz/) entonces convierte los archivos `.md` generados en Obsidian y los convierte en una web estática (HTML + CSS + demás).

Entonces mediante un commit se suben los cambios a [Gitlab](https://gitlab.com/JaviAib/wikijavi).

Entonces Gitlab ejecuta automáticamente unos procesos (Pipelines CI/CD) que son los que ejecutan Quartz y copian los archivos a la carpeta correspondiente. Estos pipelines están configurados mediante un archivo yaml del que hablaremos [[#Configuración en detalle|abajo]].
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

[![[zz Media/Pasted image 20240731183320.png|100]]](<Unity/Ejemplos de Unity/Ejemplo corrutina>)


Tanto la imagen como el enlace pueden ser online
```markdown
[![Google logo](https://images.com/Google.jpg)](<http://google.es>)
```

[![Google logo](https://c.clc2l.com/t/g/o/google-A7roaL.jpg)](<http://google.es>)

más info en la [web oficial](https://help.obsidian.md/Linking+notes+and+files/Internal+links#:~:text=To%20link%20to%20a%20heading,to%20Preview%20a%20linked%20file.&text=To%20link%20to%20a%20heading%20in%20another%20note%2C%20add%20a,followed%20by%20the%20heading%20text.)

## Hightlight (Quartz)

https://quartz.jzhao.xyz/features/syntax-highlighting

## Lenguajes de programación aceptados

https://prismjs.com/#supported-languages

# Configuración en detalle

Primero vamos a clonar el proyecto Quartz ya que dentro de éste es donde debe vivir nuestro <abbr title="Traducido como bóveda. Nombre que se le da a la base de conocimiento que generas con Obsidian">Vault</abbr>.

```bash
git clone https://github.com/jackyzha0/quartz.git
cd quartz
npm i
npx quartz create
```

Ahora debemos borrar la carpeta .git que se ha descargado con el clonado e iniciamos el repositorio.

Dentro de la carpeta content, creamos el Vault de Obsidian.

Dentro de la carpeta raíz, debemos crear un archivo llamado `.gitlab-ci.yml` que contendrá lo siguiente (más info [[Informática/git/CI-CD/GitLab Implementación de CI-CD#Creación de archivo `.gitlab-ci.yml`|en su nota]])

```yaml
stages:
  - build
  - deploy

image: node:18
cache:
  key: $CI_COMMIT_REF_SLUG
  paths:
    - node_modules/

build:
  stage: build
  script:
    - npm ci
    - echo "Building the site..."
    - npx quartz build 
  artifacts:
    paths:
      - public

pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
      - public
  only:
    - main

```

Esto será procesado automáticamente por gitlab para que Quartz haga la build (convertir de .md a web) y lo publicará en la gitlab pages

> [!warning]  Siendo gitlab, probablemente la rama esté protegida
> Para desbloquearla deberás hacer lo indicado [[Informática/git/Gitlab|en esta página]]

Y creo que eso es todo


