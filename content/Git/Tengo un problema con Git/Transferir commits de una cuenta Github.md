_Básicamente consiste en que los commits que hay en otra cuenta Github se cuenten en la mia_

Cualquiera de estos métodos es peligroso o destructivo, así que mucha precaución

Yo lo que he probado es el método de borrar la otra cuenta y funciona. He probado además el método de [filter-repo](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1CvycN3Dmbu8uW01kUXXuEcE_utMX9_bd/edit) para reescribir la historia sin subirlo a Github

# Método reescribir la historia
Ten en cuenta que si ya está publicado en Github puede ocasionarte problemas, pero si ya es un proyecto colaborativo, la puedes liar increíblemente parda. Siempre que reescribas la historia es extremadamente peligroso, especialmente si lo tienen otros. Potencialmente destructivo. 

Yo estoy utilizando [filter-repo](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1CvycN3Dmbu8uW01kUXXuEcE_utMX9_bd/edit) porque creo que es más seguro, pero después pongo lo que dice ChatGPT que funcionaría con filter-branch

primero tienes que hacer un pull

>[!warning] HAZ UN BACKUP

Probablemente tengas que ponerle el `--force`, es decir `git filter-repo --force --commit-callback`
```shell
git filter-repo --commit-callback '
if commit.author_email == b"correo_incorrecto@example.com":
    commit.author_name = b"Tu Nombre de Github"
    commit.author_email = b"correo_correcto@example.com"
if commit.committer_email == b"correo_incorrecto@example.com":
    commit.committer_name = b"Tu Nombre de Github"
    commit.committer_email = b"correo_correcto@example.com"
' 
```

Después de hacer esto, al hacer push, deberás usar el `--force`

## Con filter-branch (no lo he probado)

>[!warning] HAZ UN BACKUP

```shell
git filter-branch --env-filter '
OLD_EMAIL="correo_incorrecto@example.com"
CORRECT_NAME="Tu Nombre"
CORRECT_EMAIL="correo_correcto@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags 
```

# Método eliminar la otra cuenta

Para conseguir esto, tienes que eliminar la otro cuenta, la que tiene los cambios que necesitas en la tuya

Una vez hecho eso, tienes que ir a tu cuenta, en Settings

![[Pasted image 20250420191241.png]]

Ir al apartado emails

![[Pasted image 20250420191257.png]]

Y añadir el correo de la otra cuenta

![[Pasted image 20250420191310.png]]