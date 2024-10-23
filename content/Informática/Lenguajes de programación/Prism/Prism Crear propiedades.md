El ViewModel debe heredar de BindableBase y mediante el snippet propp creas una propiedad (si el snippet no está, puede agregarlo desde [[Snippets|aquí]]), pero básicamente se vería así

```cs 
private string _updateText;
public string UpdateText
{
    get { return _updateText; }
    set { SetProperty(ref _updateText, value); }
}
``` 
