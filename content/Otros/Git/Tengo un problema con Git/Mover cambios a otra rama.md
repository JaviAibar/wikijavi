Es común equivocarse y hacer cambios en una rama incorrecta

Si **no se ha hecho commit**, todavía no está fijado a la rama, simplemente haz [[2 - git checkout|checkout a la rama]] necesaria y solucionado. Sin embargo, solo funcionará si las historia encajan. En caso de no encajar, se puede hacer stash de los cambios, cambiar de rama y hacer pop del stash guardado

>[!note] Si no encajan los cambios tendrás que [[9 - git merge|resolver los conflictos]]

>[!tip] En caso de haber hecho **commit sin push**
>puedes hacer reset [[Revertir cambios|git reset HEAD~1]]. Esto te dejará en el punto de "todavía no commiteado"
>Alternativamente puedes hacer [[git cherry-pick]], [[git rebase|rebase normal]] o [[rebase interactivo]]

# Bibliografía

[https://www.howtogeek.com/devops/how-to-move-changes-to-another-branch-in-git/](https://www.howtogeek.com/devops/how-to-move-changes-to-another-branch-in-git/)