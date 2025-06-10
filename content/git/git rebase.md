Permite reordenar los commits para que se vean secuenciales en lugar de en diferentes ramas.

Nos situamos en la rama que queremos copiar (poner a continuación de main) y hacemos `git rebase main`

Entonces hacemos [[2 - git checkout]] de main y hacemos `git rebase bugFix`

| ![[Pasted image 20250420192126.png]] | `git rebase` | ![[Pasted image 20250420192138.png]] | 
| ------------------------------------ | ------------ | ------------------------------------ |     

Para rebase interactivo [[rebase interactivo]]

> [!tip] TortoiseGit utiliza siempre rebase interactivo