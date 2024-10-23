Para info general del patrón de diseño [[(DI) Dependency Inyection]],

En el ejemplo de [https://prismlibrary.com/docs/wpf/getting-started.html](https://prismlibrary.com/docs/wpf/getting-started.html) crean una dependencia entre MainWindowViewModel y una interfaz random llama ICostumerStore. Para que su implementación pueda ser manejada por el contenedor de dependencias, se debe registrar en App.xaml.cs en el método RegisterTypes:

```cs
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterSingleton<IMessageService, MessageService>();
    containerRegistry.Register<Services.ICustomerStore, Services.DbCustomerStore>();
}
```
# Bibliografía

https://web.archive.org/web/20220730142511/https://prismlibrary.com/docs/wpf/getting-started.html 