## RequireComponent

Si añades el componente a un GameObject, añadirá automáticamente otro componente del tipo indicado, además impedirá borrarlo

```cs 
[RequireComponent(typeof(Rigidbody))]
``` 


[RequireComponent](https://docs.unity3d.com/ScriptReference/RequireComponent.html)
[Rigidbody](https://docs.unity3d.com/ScriptReference/Rigidbody.html)

## ContextMenu

Añade un botón al menú textual del componente con el nombre dado por como argumento (en el ejemplo Test). Si clicas en dicho botón, se ejecuta el método justo debajo (en el ejemplo, el método pruebita que lanza un mensaje a la consola)

```cs 
[ContextMenu("Test")]
void Pruebita()
{
    Debug.Log("LA PRUEBITA");
}
``` 

![[Pasted image 20250612195549.png]]

## HeaderAttribute

Separa las propiedades del código en secciones con el nombre dado como argumento

```cs 
[Header("Health Settings")]
public int health = 0;
public int maxHealth = 100;

[Header("Shield Settings")]
public int shield = 0;
public int maxShield = 0;
``` 

![[Pasted image 20250612195807.png]]

## ExecuteInEditMode

Permite ejecutar código incluso sin poner el modo Play

```cs 
[ExecuteInEditMode]
``` 

## GradientUsage

Sirve para que aparezca un editor de gradiente. Importante: Se debe indicar el uso o no de HDR como argumento

```cs 
[GradientUsage(true)]
public Gradient test;
``` 

![[Pasted image 20250612195843.png]]

![[Pasted image 20250612195846.png]]

## HideInInspector

Permite ocultar una variable en el inspector pero ser serializada

```cs 
[HideInInspector]

int p = 5;
``` 

![[Pasted image 20250612195922.png]]

## InspectorName

Permite poner un nombre en el inspector diferente al del código

```cs 
[InspectorName("16 bits")]
``` 

![[Pasted image 20250612195952.png]]

## MinAttribute

Permite poner límite inferior a una variable

## MultilineAttribute

Permite que un string pueda ser editado como un campo de texto multilínea

![[Pasted image 20250612200006.png]]

## Range

Genera un slider mediante indicándole mínimo y máximo

```cs 
// This integer will be shown as a slider,
// with the range of 1 to 6 in the Inspector
[Range(1, 6)]
public int integerRange;

// This float will be shown as a slider,
// with the range of 0.2f to 0.8f in the Inspector
[Range(0.2f, 0.8f)]
public float floatRange;
``` 

![[Pasted image 20250612200029.png]]

## MenuItem

```cs 
using UnityEngine;
using UnityEditor;

public class MyPlayer : MonoBehaviour
{
    [MenuItem("AssetDatabase/LoadAssetExample")]
    static void ImportExample()
    {
        Texture2D t = (Texture2D)AssetDatabase.LoadAssetAtPath("Assets/Textures/texture.jpg", typeof(Texture2D));
    }
}
``` 

![[Pasted image 20250612200055.png]]

Mirar [SerializeField](https://docs.unity3d.com/ScriptReference/SerializeField.html) y [Serializar](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1yX5l61eWdR5JjKREDn32tDLEfMrnQMiM/edit)

## FormerlySerializedAs

Para variables que han cambiado de nombre

```cs 
[FormerlySerializedAs("hitpoints")]
    public int health;
    ``` 

CUIDADO ⚠️

Ten cuidado porque pensaba que una vez Unity se lo había tragado, ya podías borrar el atributo, pero luego al cambiar de escena se pierde la ref

[https://docs.unity3d.com/ScriptReference/Serialization.FormerlySerializedAsAttribute.html](https://docs.unity3d.com/ScriptReference/Serialization.FormerlySerializedAsAttribute.html)

# Keywords

Formerly Serialized As serializadas anteriormente antes llamada llamadas referencia