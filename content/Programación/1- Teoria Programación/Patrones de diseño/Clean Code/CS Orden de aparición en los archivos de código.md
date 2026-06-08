De acuerdo a las [reglas de documentación de StyleCop](https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/documentation/SA1201.md) el orden es el siguiente:

Dentro de una clase, estructura o interfaz: (SA1201 y SA1203)

- Variables constantes
- Variables
- Constructores
- [Finalizadores (Destructores)](https://learn.microsoft.com/es-es/dotnet/csharp/programming-guide/classes-and-structs/finalizers) - Lo que debe hacer la instancia cuando se destruye
- Delegados
- Eventos
- Enums
- Interfaces (implementations) - supongo que se refiere a los métodos que toca definit al añadir la interfaz a la clase
- [Propiedades](https://learn.microsoft.com/es-es/dotnet/csharp/programming-guide/classes-and-structs/properties) - Lo de public Vector3 CurrentPosition => transform.position;
- [Indizadores](https://learn.microsoft.com/es-es/dotnet/csharp/programming-guide/indexers/)- permiten que la clase/struct pueda ser accedide como un array (igual que un diccionario) myClaseIndexada[1].ejemplo()
- Metodos
- Structs
- Subclasses

Dentro de cada uno de estos grupo, ordenado por acceso: (SA1202)
- public / SerializeField (esta me la he inventado)
- internal
- protected internal
- protected
- private

Dentro de cada uno de estro grupos, ordenado por estatico: (SA1204)
- static
- non-static

Dentro de los cuales, ordenado por readonly: (SA1214 y SA1215)
- readonly
- non-readonly

La lista sigue hasta unas 130 línes que no voy a detallas, pero algunas de ellas son las siguientes:
- public static methods
- public methods
- internal static methods
- internal methods
- protected internal static methods
- protected internal methods
- protected static methods
- protected methods
- private static methods
- private methods

En la docu indica también que si no viene bien el order, por ejemplo, que necesites declarar varias interfaces cuyos métodos deban agruparse, recomiendan hacer un una clase parcial para agruparlos.
  
Ejemplo práctico
```csharp
// public
// static
public static readonly Pi = 3.14f; //readonly primero
public static GameState state;
// no static
public readonly float randomValue = new Random.Range(0, 1); // readonly primero
public GameObject prefab;
  
// internal, protected internal, protected
  
// private
// static
private static readonly Vector3 finalPosition = new Vector3(0, 0, 0); // readonly primero
private static Vector3 currentPositionToSpawn;
// no static
private readonly float maxLife; // readonly first
private float currentLife;
  
// Delegados
public delegate blabla
private delegate balbla2
  
// Eventos
public static event blabla OnBlabla 
public event blabla2 OnBlabla2
private static event blabla OnBlablaPrivate
private event blabla2 OnBlabla2Private
  
// Enum
public enum dirs { Up, Left, Down, Right }
  
// Implementación interfaces
public void OnPointerClickHandler() { }
  
// Propiedades
public Vector3 CurrentPosition => transform.position;
  
// Indizadores
private T[] arr = new T[100];
public T this[int i]
{
    get { return arr[i]; }
    set { arr[i] = value; }
}
  
// Métodos
// public
public static float Sum(float a, float b) => a + b;
public void Move(Vector3 pos) => transform.posicion = pos;
  
// internal, protected internal, protected
  
// private
private static Zombie FindZombieMinLife() => Zombie.Instance.List.ForEach(/* Mucho código */);
private void Instance() => _currentLife = MaxLife;

```
#  Bibliografía

[https://stackoverflow.com/questions/150479/order-of-items-in-classes-fields-properties-constructors-methods](https://stackoverflow.com/questions/150479/order-of-items-in-classes-fields-properties-constructors-methods)