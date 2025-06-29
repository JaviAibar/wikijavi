Para revertir cambios en un merge **simple** (de dos ramas) tan solo hay que hacer un reset de HEAD `git reset HEAD`

Para revertir cambios en un merge **complejos** (de más de dos ramas) hay que abortar el merge `git merge --abort`

Para aplicar los cambios manualmente simplemente se modifica el fichero de tal forma que (aunque podría no ser siempre así):

```
<<<<<<< yours:sample.txt Conflict resolution is hard; Esta parte está dentro de tu archivo ======= Git makes conflict resolution easy. 

Esta es la parte del repositorio

>>>>>>> theirs:sample.txt
```

>[!tip] AÑADIR y hacer commit