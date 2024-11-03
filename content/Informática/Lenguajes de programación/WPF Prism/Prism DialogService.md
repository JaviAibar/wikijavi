# Ventanas modales

26-UsingDialogService

Deberemos registrar nuestra `UserControl` como dependencia en el `RegisterTypes` de `App.xaml.cs`

_App.xaml.cs_
```cs 
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterDialog<NotificationDialog, NotificationDialogViewModel>();
}
``` 

En el constructor podemos recibir el servicio de dialogos.

El método `ShowDialog` nos devuelve una variable del tipo `IDialogResult` con el resultado de la modal (aunque sospecho que podríamos recibir el tipo que queramos, ya que viene dado por un `Action` que definiremos en seguida)

```cs 
public MainWindowViewModel(IDialogService dialogService)
{
    _dialogService = dialogService;
}

private void ShowDialog()
{
    var message = "This is a message that should be shown in the dialog.";
    //using the dialog service as-is
    _dialogService.ShowDialog("NotificationDialog", new DialogParameters($"message={message}"), r =>
    {
        if (r.Result == ButtonResult.None)
            Title = "Result is None";
        else if (r.Result == ButtonResult.OK)
            Title = "Result is OK";
        else if (r.Result == ButtonResult.Cancel)
            Title = "Result is Cancel";
        else
            Title = "I Don't know what you did!?";
    });
}
``` 

Mientras tanto, en el `ViewModel` del propio dialogo, deberíamos implementar `IDialogAware` y toda la lógica para determinar cuál fue el resultado

_NotificationDialogViewModel.cs_
```cs 
public event Action<IDialogResult> RequestClose;

protected virtual void CloseDialog(string parameter)
{
    ButtonResult result = ButtonResult.None;

    if (parameter?.ToLower() == "true")
        result = ButtonResult.OK;
    else if (parameter?.ToLower() == "false")
        result = ButtonResult.Cancel;

    RaiseRequestClose(new DialogResult(result));
}

public virtual void RaiseRequestClose(IDialogResult dialogResult)
{
    RequestClose?.Invoke(dialogResult);
}

public virtual bool CanCloseDialog()
{
    return true;
}

public virtual void OnDialogClosed()
{

}

public virtual void OnDialogOpened(IDialogParameters parameters)
{
    Message = parameters.GetValue<string>("message");
}
 ``` 

Y por último, los botones de aceptar y cancelar

_NotificationDialog.xaml_
```xml 
<TextBlock Text="{Binding Message}" HorizontalAlignment="Stretch" VerticalAlignment="Stretch" Grid.Row="0" TextWrapping="Wrap" />
<StackPanel Orientation="Horizontal" HorizontalAlignment="Right" Margin="0,10,0,0" Grid.Row="1" >
    <Button Command="{Binding CloseDialogCommand}" CommandParameter="true" Content="OK" Width="75" Height="25" IsDefault="True" />
    <Button Command="{Binding CloseDialogCommand}" CommandParameter="false" Content="Cancel" Width="75" Height="25" Margin="10,0,0,0" IsCancel="True" />
</StackPanel>
``` 


# Darle estilo

27-StylingDialog

Nótese que es una etiqueta propia de prism

_NotificationDialog.xaml_
```xml 
<prism:Dialog.WindowStyle>
    <Style TargetType="Window">
        <Setter Property="prism:Dialog.WindowStartupLocation" Value="CenterScreen" />
        <Setter Property="ResizeMode" Value="NoResize"/>
        <Setter Property="ShowInTaskbar" Value="False"/>
        <Setter Property="SizeToContent" Value="WidthAndHeight"/>
    </Style>
</prism:Dialog.WindowStyle>
``` 

# Ventana de dialogo personalizada (modal personalizada)

28-UsingCustomWindow

Además de registrar nuestra `UserControl` como dependencia en el `RegisterTypes` de `App.xaml.cs` tal y como hacíamos al principio de esta pagina, deberemos registrar también la nueva `Window`. Que creo que es la que servirá como soporte para que nuestra `UserControl` se ubique en lugar de usar la de por defecto

_App.xaml.cs_
```cs 
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterDialogWindow<MyCustomWindow>();
    containerRegistry.RegisterDialog<NotificationDialog, NotificationDialogViewModel>();
}
``` 

Todo lo demás es completamente idéntico, porque al registrarlo como `DialogWindow` en las dependencias, la usará por defecto