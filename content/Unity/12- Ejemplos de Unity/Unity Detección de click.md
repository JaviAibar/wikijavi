Si el click es de Button, estaría bien que mirases [esto](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/12ZAq1nsOKY0MfXaKl27aGx18I3698aG3/edit)

Una buena forma de hacerlo es añadir al sprite un `BoxCollider` u otro `Collider`

Y dentro del código asociado al sprite, poner un método evento `OnMouseDown, OnMouseOver`, entre otros (véase otros métodos que es capaz de capturar (entre otros de `MonoBehaviour`, que es quien contiene los métodos que ejecuta el `Collider`) [https://docs.unity3d.com/ScriptReference/MonoBehaviour.html](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) )

# Scene

Después tenemos dos opciones dependiendo si queremos que el click se transmita bubble:

## Modo buble:

La forma más sencilla (y menos útil), podemos utilizar OnMouseDown y un `BoxCollider2D`
```cs
private void OnMouseDown()
{
    print("CLICADO!");
}
```

  

## Modo Raycast:

`Raycast` no funciona con `Box Collider 2D` [(ref)](https://answers.unity.com/questions/596792/raycast-on-a-2d-collider.html), debemos poner uno **`BoxCollider`**

```cs 
void Update()
{
    if (Input.GetMouseButtonDown(0))
    {
        RaycastHit hit;
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out hit, 100.0f))
        {
            Debug.Log("You selected the " + hit.transform.name); // ensure you picked right object
        }
    }
}
``` 

# UI

Para detección en el canvas, se añade al script que ejecuta los eventos (la lógica de nuestro click en el elemento que recibirá el click), una interfaz por cada acción que debe ser ejecutada (si pasará el ratón por encima o si es un click o cualquier otra interacción), y su correspondiente método accionador:

- Para hover (por ejemplo) -> `IPointerEnterHandler` y método `public void OnPointerEnter(PointerEventData eventData)`
    

```cs 
// Código que se pondrá como componente en el gameobject ejecutable (que estará dentro del canvas)
using UnityEngine.EventSystems; // En esta clase están las interfaces
public class ElementoClicable : MonoBehaviour, IPointerClickHandler // Interfaz para permitir el click
{
public void OnPointerClick(PointerEventData eventData)
    {
        print("Click realizado");
    }
}
``` 

# Bibliografía

[http://answers.unity.com/answers/1095070/view.html](http://answers.unity.com/answers/1095070/view.html)