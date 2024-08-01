# Tengo un problema con GitLab

## No puedo hacer push, me dice: `! [remote rejected] main -> main (pre-receive hook declined)` y soy Owner (propietario)

`Owner` y `Maintainer` no son lo mismo

Eso es porque la rama está protegida, tienes dos opciones:

\1. **Cambiar rol:** Pedir que te asignen un rol con el que puedas hacer push a esa rama, se pueden cambiar roles desde `Manage > Members`

\2.  Si eres Owner y todavía no puedes, lo que habrá que hacer es cambiar los permisos de la rama en `Setting > Repository > Protected Branches`. 

> [!info]  Aquí de nuevo tienes dos opciones:

2.1 Desproteger la rama por completo

![](https://lh3.googleusercontent.com/kzNa1HiYr5Ulz3R50uJq56K7C3-8FfOygTr0mWEq832B1FXarEHQ1LFnrqFt6MTuNptkiBBwaX4-y7WsfITNbw2pJPLwaucn224iUUAcFxKVvt_kwnf1j-ss8sXkc66I=w1280)

2.2 Incluir a "Developers" en ambos cuadritos

![](https://lh5.googleusercontent.com/N-Gq2WzZtdu_LdyZMyuCurjR2SGKGdNYhWNW-IHSf0Zct3OZSt4W03a1dtcCAdcJvyrztOTzKWLjCK7aDy6tRFn2PQCZAFV6i3domSrdPKlC_e0EEaDPelJ322WV3HjbYA=w1280)



# Bibliografía

[https://timmousk.com/blog/git-pre-receive-hook-declined/](https://timmousk.com/blog/git-pre-receive-hook-declined/)