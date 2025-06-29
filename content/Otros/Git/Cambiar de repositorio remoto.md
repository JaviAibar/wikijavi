Como ya estás en un repo remoto, el origin está ya apuntando dicho repo. 
Es decir, la instrucción `git remote add origin https://github.com/JaviAibar/wikijavi.git` te va a dar el error `error: remote origin already exists.`

Hay que modificarlo por el nuevo

# Corregir con TortoiseGit

![[Pasted image 20250629122151.png]]

![[Pasted image 20250629122259.png]]

# Con entorno comandos (Bash)

Para ver las que hay

```bash
git remote -v
```

Para cambiarlas

```bash
git remote set-url origin <NUEVA URL AQUI>
```

> [!important] Por qué funciona
> Porque en la sentencia que te proporciona GitHub indica "add", sin embargo ahora ponemos "set-url"


