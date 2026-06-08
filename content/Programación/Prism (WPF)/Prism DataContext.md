El método [[Prism ViewModelLocator]], te hará por defecto una asociación de DataContext con la vista en concreto

Podemos asociar información al DataContext de una vista, de esta forma

TabView es la vista (un xaml) y TabViewModel es el ViewModel asociado a dicha vista

```cs 
void SetTitle(TabView tab, string title)
{
    (tab.DataContext as TabViewModel).Title = title;
}
``` 

