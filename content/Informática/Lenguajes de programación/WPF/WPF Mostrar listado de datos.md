Hay 3 formas: ListView, ListBox y DataGrid. Siendo esta última la más sencilla

Primero diferenciar entre ListView y ListBox. La primera hereda de ListBox y además te permite mayor control sobre cómo se va a presentar la info

Entonces, para cosas simples ListBox, para cosas más complejas ListView


Debemos crear una propiedad de tipo ObservableCollection con la info que quieras mostrar. Lo suyo es crear un objeto o hacerlo de string

Y hay que sobreescribir el ToString del objeto para que sea el valor que muestre en la lista

# Obtener el elemento seleccionado de la lista

Debemos poner el x:Name en el ListView que luego referenciaremos en el CommandParameter

```xml
<ListView ItemsSource="{Binding MusicList}"
            Grid.Column="1"
            x:Name="_listOfMusic">
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="SelectionChanged">
            <prism:InvokeCommandAction Command="{Binding SongSelectedCommand}" 
                                        CommandParameter="{Binding SelectedItem, ElementName=_listOfMusic}" />
        </i:EventTrigger>
    </i:Interaction.Triggers>
</ListView>
```
# Bibliografía

[http://www.wpftutorial.net/DataGrid.html](http://www.wpftutorial.net/DataGrid.html)