# Tengo un problema con GitLab

## No puedo hacer push, me dice: `! [remote rejected] main -> main (pre-receive hook declined)` y soy Owner (propietario)

`Owner` y `Maintainer` no son lo mismo

Eso es porque la rama está protegida, tienes dos opciones:

\1. **Cambiar rol:** Pedir que te asignen un rol con el que puedas hacer push a esa rama, se pueden cambiar roles desde `Manage > Members`

\2.  Si eres Owner y todavía no puedes, lo que habrá que hacer es cambiar los permisos de la rama en `Setting > Repository > Protected Branches`. 

> [!info]  Aquí de nuevo tienes dos opciones:

2.1 Desproteger la rama por completo

![[Pasted image 20241201122625.png]]

2.2 Incluir a "Developers" en ambos cuadritos


![[Pasted image 20241201122633.png]]


# Bibliografía

[https://timmousk.com/blog/git-pre-receive-hook-declined/](https://timmousk.com/blog/git-pre-receive-hook-declined/)