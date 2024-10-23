`Elemento` o `Control` es cada componente que añades a la interfaz, lo que en terminología de Unity sería un GameObject

`Los atributos` proporcionan una manera de asociar la información con el código de manera declarativa. También pueden proporcionar un elemento reutilizable que se puede aplicar a diversos destinos. Son los típicos `[ObsoleteAttribute("Use NewMethod instead")]` o `[UnityTest]` o `[SerializeField]`

## Propiedad 

en el contexto de XAML son las caracteristicas que configuras dentro de las etiquetas; 

Ejemplo:

\<Label ==Height="20" Content="Mi etiqueta"== />

en el contexto de C# la de crear ese mix entre variable y método

Ejemplo: 

```cs
public string Name {get; set;}
```