# Creación de archivo `.gitlab-ci.yml` 

Revisar que tengas disponibles `Runners` en `Settings > CI/CD` y dentro `Runners`. Si no lo estuvieran, podrías instalar uno en tu PC se explica más abajo.

![](https://lh3.googleusercontent.com/lGV1H4MNtjtHhnwU4VFfYIXXNI79zIxk61cr-aupyT-bPQLk23KRHIL0UvLD9AhOZp2e5DrnM63q7vRrmWdEORo5gd58BAgtnP-kg6Jl18_Q8c3eyb6pt1oG7pX55aBAPA=w1280)

Si usas los propios de GitLab.

Con que haya 1 es sufi, y tenemos 58

2. Crear un archivo llamado `.gitlab-ci.yml` en la raíz del repositorio. Si prefieres ponerlo en otro sitio, deberás indicar la ubicación en `Setting > CI/CD [Expandir General pipelines] > CI/CD configuration file`. Este archivo contendrá la estructura y orden de las tareas y decisiones en base a condiciones que se encuentre.

```yaml
build-job:
  stage: build
  script:
    - echo "Hello, $GITLAB_USER_LOGIN!"

test-job1:
  stage: test
  script:
    - echo "This job tests something"

test-job2:
  stage: test
  script:
    - echo "This job tests something, but takes more time than test-job1."
    - echo "After the echo commands complete, it runs the sleep command for 20 seconds"
    - echo "which simulates a test that runs 20 seconds longer than test-job1"
    - sleep 20

deploy-prod:
  stage: deploy
  script:
    - echo "This job deploys something from the $CI_COMMIT_BRANCH branch."
  environment: production
```
## Contenido base de `.gitlab-ci.yml`

Aquí se pueden ver 4 tareas (jobs): `build-job`, `test-job`, `test-job2` y `deploy-prod`.

Los comentarios están listados en los comandos `echo` y se mostrarán en la interfaz cuando veas tus trabajos. Los valores de las variables predefinidas `$GITLAB_USER_LOGIN` y `$CI_COMMIT_BRANCH` se inicializan cuando se ejecutan las tareas

Por último hacemos commit del archivo `.gitlab-ci.yml`. Y creo que en este momento, las tareas se ejecutan automáticamente

En `CI/CD > Pipelines` puedes ver el estado de las tareas

![](https://lh5.googleusercontent.com/PUvTbKXmnXbr_ZAt-IiwddRrQrlHQpnzBjTfh0USr3zbF80fnfdOnGV05vK7bFK5HGsjNshzRVvnTsZ92XZ9yMo0v61ZYQ-HtUK4lRAWBHJBeFPD7H_1x8Nz1mrgku1H9g=w1280)

![](https://lh3.googleusercontent.com/-wuvn1m54HhVpB-HN2ESTwIyIDU1Ss21E3L4mMa1TSwEg-r4Xl12RBfHk072h2ZxeNZmNJdncDmVaGON9rEUhc8IKxtQxfhaycSC-aopywLiyMDZdEL6hRvQWT7lAtPAVw=w1280)

Si pinchas en el id puedes ver una representación visual

![](https://lh4.googleusercontent.com/gk9oOXh2xrO9GeQc15WzRyZDuEP17ubtKyQb_0c2tBrefXZAFyCPfIzfF4lRUEZ29bt317TmwYZ8907K7oxt4C_1gmVw-58LiJ6nCuaLn0GWPkvRB2etgF0mWDqbP48L9g=w1280)

Para detalles, pulsa en la tarea en concreto, p.e. deploy-prod

# Instalación de Runner

## GitlabRunner (executable)

Crea una carpeta en algún sitio. Ejemplo GitlabRunner

Mete dentro [el instalable](https://docs.gitlab.com/runner/install/windows.html)

Se supone que ahora le tienes que [quitar los permisos de escritura a la carpeta para que no te la líen](https://docs.gitlab.com/runner/install/windows.html#:~:text=Make%20sure%20to%20restrict%20the%20Write%20permissions%20on%20the%20GitLab%20Runner%20directory%20and%20executable.) y [debes instalar el GitlabRunner en una máquina diferente a la que tienes el Gitlab instance. Ni idea](https://docs.gitlab.com/runner/install/#:~:text=For%20security%20and%20performance%20reasons%2C%20you%20should%20install%20GitLab%20Runner%20on%20a%20machine%20that%20is%20separate%20to%20the%20machine%20that%20hosts%20your%20GitLab%20instance.)

## Conseguir un token

Ahora tienes que ir a `CI/CD > Runners` y crear una instancia de Runner. Seleccionar Windows, ponerle etiquetas y seleccionar que puede ejecutar tareas sin etiquetar

![](https://lh4.googleusercontent.com/GX4O5W60m-SGpIxepsnfw9sTL3cv5hqATfPJgtBVaZMssDLZ-AmdDkKRMSHxhGUV52_n2bWOx9GFoj3pNqe9KvF0fv2Gjpt_eFFLS-ixIbo57tQFwynOWT85n5ho9pDhSA=w1280)

![](https://lh3.googleusercontent.com/Nr3_K7U5QtTHkZiVam0uDyssTj0Qy7cdAgAeyoGcB5l2lSzYxi_2a8scW6pda-E_gl6D3-CY2gLQHa_tstBr7k0f7YpYhGrPDoJJkSBt1P4nANRfeMGO6-rlK7MbcoKpVA=w1280)

![](https://lh6.googleusercontent.com/iKMQhFN9430D-wMXZ93jr8QlsqzS0i-95KeOFBVQGk1kStfQV8acDjVKL7-cKqB0jHj_bkqmWQFAByjYbbBUYtRhGw0y4MPzcWny5svwXjJOFuA0VgQTlGupnmsWsHqzqA=w1280)

Esto te generará un `token` y los comandos que deberás ejecutar para la siguiente fase: registrarlo

## Registrar Runner

Nos situamos en la carpeta donde tenemos el `GitlabRunner` y ejecutamos el comando obtenido en parte anterior: `.\gitlab-runner.exe register  --url https://gitlab.com  --token <token>` en una consola con permisos. Cuando nos pida URL ponemos la de por defecto `gitlab`. Cuando nos pida nombre, nos inventamos uno y cuando nos pida el executor, le decimos `shell`.

Abrimos el archivo que nos acaba de generar: `config.toml` y cambiamos `shell = "pwsh"` por `shell = "powershell"`

Ejecutamos `.\gitlab-runner.exe install` y `.\gitlab-runner.exe start` (install es para que ponga el servidor como servicio en windows, el start para que lo inicie)

Volvemos a `CI/CD > Runners` y desactivamos los `Shared runners`, ya que si no lo hacemos seguirá pidiéndonos verificación

# Consejos sobre cómo escribir el `.gitlab-ci.yml` 

Sintaxis completa [aquí](https://docs.gitlab.com/ee/ci/yaml/index.html)

Hay un editor en `CI/CD > Editor`

Cada tarea contiene una sección script y le pertenece una etapa:

- La etapa describe la ejecución secuencial de los trabajos. Si hay runners disponibles, los trabajos de una única etapa, se ejecutan en paralelo.

- Se puede usar la palabra reservada `needs` para  ejecutar una tarea fuera de orden. Esto genera un [Grafo Dirigido Acíclico (DAG)](https://docs.gitlab.com/ee/ci/directed_acyclic_graph/index.html)

También añadir configuración para personalizar como se ejecutan las tareas y etapas:

- La palabra reservada `rules` especifica cuando ejecutar o saltar tareas. Las `only` y `except` todavía están disponibles pero no se pueden usar con `rules` en la misma tarea

- Mantén la información a través de trabajos y etapas persistentes en una tubería (pipeline) con [cache](https://docs.gitlab.com/ee/ci/yaml/index.html#cache) y [artifacts](https://docs.gitlab.com/ee/ci/yaml/index.html#artifacts). Estas palabras clave son formas de almacenar las dependencias y la salida de los trabajos, incluso cuando se utilizan ejecutores efímeros para cada tarea.

- Utilice la palabra clave [default](https://docs.gitlab.com/ee/ci/yaml/index.html#default) para especificar configuraciones adicionales que se aplican a todos los trabajos. Esta palabra clave se utiliza a menudo para definir las secciones [before_script](https://docs.gitlab.com/ee/ci/yaml/index.html#before_script) y [after_script](https://docs.gitlab.com/ee/ci/yaml/index.html#after_script) que deben ejecutarse en cada trabajo.

# Bibliografía

CI/CD [https://docs.gitlab.com/ee/ci/quick_start/](https://docs.gitlab.com/ee/ci/quick_start/)