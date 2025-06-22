Tengo una clase Singletone llamada GameEngine que implementa un enumerado uint con atributo `[System.Flags]`

```cs 
public class GameEngine : MonoBehaviour
    {
        public static GameEngine instance;

        // http://answers.unity.com/answers/1767255/view.html
        [System.Flags]
        public enum VerboseEnum
        {
            Nothing = ~1,
            Speed = 1<<1,
            Physics = 1<<2,
            TrafficLightChanges = 1<<3,
            SolutionConditions = 1<<4,
            GameTrace = 1<<5,
            Everything = ~0
        }
        
        public VerboseEnum verbose;

private void Awake()
{
            if (instance == null)
                instance = this;
}
``` 

Después implemento 2 métodos, uno para acceso a la instancia y otro estático para facilitar el acceso

```cs 
public void PrintInstance(string msg, VerboseEnum type)
        {
            if (((byte)verbose & (byte)type) != 0)
                print(msg);
        }

        public static void Print(string msg, VerboseEnum type)
        {
            if (!instance) print("No GameEngine instance");
            instance?.PrintInstance(msg, type);
        }
        ``` 

Para hacer más cómodo el acceso desde otras clases, les pongo arriba

```cs 
using static GameEngine;
``` 


de esta forma puede ejecutar los métodos de la siguiente forma

```cs 
Print($"Mi print de debug super chachi", VerboseEnum.Physics);
``` 

Por último para asignar programáticamente el filtro deberás encadenar los filtros con ors binarios

```cs 
gameEngine.verbose = GameEngine.VerboseEnum.GameTrace | GameEngine.VerboseEnum.Speed;
``` 

