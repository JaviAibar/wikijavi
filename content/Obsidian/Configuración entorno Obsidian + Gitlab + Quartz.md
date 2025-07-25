[Obsidian](https://obsidian.md/) es el software para tomar notas que uso para WikiJavi.

[Quartz](https://quartz.jzhao.xyz/) entonces convierte los archivos `.md` generados en Obsidian y los convierte en una web estática (HTML + CSS + demás).

Entonces mediante un commit se suben los cambios a [Gitlab](https://gitlab.com/JaviAib/wikijavi).

Entonces Gitlab ejecuta automáticamente unos procesos (Pipelines CI/CD) que son los que ejecutan Quartz y copian los archivos a la carpeta correspondiente. Estos pipelines están configurados mediante un archivo yaml del que hablaremos [[#Configuración en detalle|abajo]].


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

Dentro de la carpeta raíz, debemos crear un archivo llamado `.gitlab-ci.yml` que contendrá lo siguiente (más info [[GitLab Implementación de CI-CD#Creación de archivo `.gitlab-ci.yml`|en su nota]])

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
> Para desbloquearla deberás hacer lo indicado [[Gitlab|en esta página]]

Y creo que eso es todo


