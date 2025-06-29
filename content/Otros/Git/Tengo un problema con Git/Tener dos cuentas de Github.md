Antiguamente era más fácil pero más incómodo e inseguro. Ya que permitía elegir la sesión simplemente con una contraseña. Ahora es necesario tener una clave SSH para cada cuenta.

Siempre que vayas a cambiar el usuario que publica el proyecto debes hacer los siguientes pasos (una descripción detallada más abajo):

1. Cambiar el nombre `git config --global user.name "ApoyoG"` puedes ver cual hay con `git config --global user.name`

2. Cambiar el email `git config --global user.email "ApoyoG@gmail.com"` puedes ver cual hay con `git config --global user.email`

> [!CAUTION] Atento!
> Fíjate que pone TempJavi
> 

3. Seleccionar como url para subir los cambios, la que indicaste en el archivo `config git remote set-url origin git@github.com-TempJavi:ApoyoG/WikiJavi.git` 

4. Añadir (si no lo está) la clave asociada a este usuario `ssh-add "C:/Users/Javi/.ssh/ApoyoG"` para revisar cuáles hay `ssh-add -l -E sha256`


Para crear una nueva clave, ve a la carpeta donde quieras que se cree (puede ser cualquiera, aunque recomendable que sea la por defecto C:\Users\Javi\.ssh, porque aquí busca TortoiseGit) y ejecuta

```bash
ssh-keygen -t rsa -b 4096 -C "[your-email@example.com](mailto:your-email@example.com)"
```

Te pedirá el nombre del archivo, yo le he puesto el mismo que le nombre de usuario (ApoyoG). Tú ponle el tuyo

Te lo generará en la carpeta que le digas. Creo que le puse punto (.) para que lo hicera en la que estamos

Ahora entras en cada cuenta de `Github y en Settings > SSH > Add new SSH` y pegas el contenido de ApoyoG.pub que está en la carpeta que le indicaste antes

Al mismo nivel en donde están los archivos que acabamos de generar, creamos uno llamado `config` y ponemos lo siguiente

  
```config
# ApoyoG
Host github.com-ApoyoG
  HostName github.com
  User git
  IdentityFile ./ApoyoG
```

`IdentityFile` tiene que apuntar al archivo sin la extensión (el `.pub`)

Iniciamos el agente de autenticación (esto evita el error `Could not open a connection to your authentication agent.`)

 ```eval `ssh-agent -s` ```

Ahora le damos al agente SSH a conocer nuestras claves

```Shell
ssh-add "C:/Users/Javi/.ssh/ApoyoG"
```

(Sigue adelante y si falla prueba esto) Y configuramos que git use este agente

```shell
git cnonfig --global core.sshCommand "ssh -v"
```  

Para ver qué claves hay 

```shell
ssh-add -l -E sha256
```

> [!Warning]
> y si queremos eliminar una
>```Shell
ssh-add -d "C:/Users/Javi/.ssh/ApoyoG"

Debemos de configurar la referencia al repositorio remoto. El usuario que pone es el dueño del repo, que puede ser otro (el primer ApoyoG (precedido por guión) es el que hará la subida, el segundo es el dueño del repo)

```shell
git remote set-url origin git@github.com-ApoyoG:ApoyoG/WikiJavi.git
```

![[Pasted image 20250420190242.png]]

Comprobamos que haya cambiado con el comando

```shell
git remote -v
```

Y prueba a ver si funciona

```shell
git push -u origin main
```

# Errores

## Could not open a connection to your authentication agent.

debes iniciar el agente con ``` eval `ssh-agent -s` ```

## Está intentando usar otro usuario (y no tiene permisos)

Para saber exactamente qué usuario está intentando usar `ssh-add -l -E sha256`

Si te dice que el usuario no tiene permisos (y está intentandolo con otro) debes ejecutar en la carpeta del proyecto `git remote set-url origin git@github.com-ApoyoG:ApoyoG/WikiJavi.git` para que se asocie el proyecto con tu usuario

## El usuario es correcto pero sigue sin permisos

Mira si está usando una clave SHA256 si quiera con el comando `ssh-add -l -E sha256` Si no pone un texto con la clave, deberás asociarla con` ssh-add "C:/Users/Javi/Documents/Proyectos git/github-ssh-keys/ApoyoG"`

## Está usando la clave y el usuario es correcto pero sigue sin permisos

Puede que alguna referencia del proyecto se ha roto. Prueba a hacer todo lo siguiente (el primer ApoyoG (precedido por guión) es el que hará la subida, el segundo es el dueño del repo). 

>[!warning] 
> Fijate que sea main y no master

```shell
git remote add origin https://github.com-ApoyoG/ApoyoG/Proyecto-de-prueba.git
```git branch -M main
eval `ssh-agent -s`
ssh-add "C:/Users/Javi/.ssh/ApoyoG"
`````git pull 
git push -u origin main``git remote -v (para comprobar que está bien enlazado)
eval `ssh-agent -s`
ssh-add "C:/Users/Javi/.ssh/ApoyoG"
`````git pull 
git push -u origin main``