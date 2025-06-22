Si cambias de escena, ten en cuenta que debe estar en [[DontDestroyOnLoad]] (patrón singleton)

Admite métodos privados de otro script

Al suscribirlo por código no aparecerá en el Inspector, ni siquiera en modo debug

Hay 3 formas de hacerlo:

```cs 
button.onClick.AddListener(OnPoolClick); // Metodo 1 (sin parámetros)
button.onClick.AddListener(() => OnPoolClick()); // Metodo 2 (lambda) podría tener parámetros
button.onClick.AddListener(delegate {TaskWithParameters("Hello"); }); // Método 3 (delegado con parámetros)

void OnPoolClick()
{
    //Codigo
}

void TaskWithParameters(string s) {
    print(s);
}
``` 

# Keywords

OnClick AddListener boton button listener