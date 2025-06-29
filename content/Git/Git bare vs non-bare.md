Parece que por defecto, se crea _no bare_

Si lo que queremos crear es una copia del proyecto sin working directory (es decir, en la que solo se hacen push y pull, no cambios ni nuevos commits, osea la típica remota como github o gitlab) entonces será bare, es decir están destinados **solo** a almacenar el repo, mientras que los locales serán no bare

> [!tip] No se puede hacer un `git push` a un repositorio non-bare

# Bibliografía
https://www.danielnavarroymas.com/repositorio-git-bare-vs-non-bare/