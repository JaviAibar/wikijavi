Como las TabItem se crean programáticamente, si quieres asociar un nombre al Header, deberás hacerlo como recurso de la ventana...

...para ello debes incluir esto en el mismo xaml donde esté tu TabControl

```xml 
<Window.Resources>
    <Style TargetType="TabItem">
        <Setter Property="Header" Value="{Binding DataContext.Title}" />
    </Style>
</Window.Resources>
``` 

Aunque también podrías hacerlas de forma imperativa

```xml 
<TabControl>
    <TabItem prism:RegionManager.RegionName="MusicRegion" Header="Music" />
    <TabItem prism:RegionManager.RegionName="Visualizer3DRegion" Header="3D Viewer" />
    <TabItem prism:RegionManager.RegionName="DataManagingRegion" Header="Data Manager" />
</TabControl>
``` 
