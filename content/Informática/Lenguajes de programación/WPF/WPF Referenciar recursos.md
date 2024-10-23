# Recursos estáticos

Son más eficientes, pero el recurso tiene que existir antes de ejecutar la app. No soporta referencias hacia adelante (Forward References). Cargan al inicio de la aplicción

- Recursos que **no** serán reevaluados, como recargar la página
    
- Que no sean DependencyObject o Freezable
    
- Cuando estás creando una librería de recursos en una DLL
    
- Para temas / controles personalizados (según entiendo, de hacerlo dinámico te arriesgas a la posibilidad de que cambie de nombre el recurso)
    
- Usando recursos para configurar un gran numero de propiedades de dependencia
    
- Quieres cambiar el recurso subyacente para todos los clientes, o quieres mantener instancias editables separadas para cada cliente usando el atributo x:Shared

# Recursos dinámicos

Usamos los dinámicos cuando el valor se genera en tiempo de ejecución. Por ejemplo: SystemFonts. No se cargan hasta que no se necesitan.

- Tienes una estructura de recursos compleja que tiene interdependencias donde se requiera una referencia hacia adelante (Forward Reference). Estas referencias no están soportadas por las referencias estáticas
    
- Para recursos grandes que puedan no necesitarse inmediatamente (los recursos dinámicos se cargan solo cuando se necesitan)
    
- Elementos que podrían cambiar de parenting
    

Se han omitido algunos. Más info en [este enlace](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview?view=netdesktop-7.0)


# Bibliografía

[https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview?view=netdesktop-7.0](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/systems/xaml-resources-overview?view=netdesktop-7.0)

# Keywords

StaticResource DynamicResource Library Dictionary Style Brush Brushes Theme Themes Estático Dinámico MergeDiccionaries MergedDictionaries Resources
