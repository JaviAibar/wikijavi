# UI

```cs 
using UnityEngine;
using UnityEngine.EventSystems;

public class WindowDraggable : MonoBehaviour, IBeginDragHandler, IDragHandler,  IEndDragHandler
{
    private bool dragging;
    private Vector2 positionOffset;

    public void OnBeginDrag(PointerEventData eventData)
    {
        positionOffset = transform.position - Input.mousePosition;
        dragging = true;
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (dragging)
        {
            transform.position = Input.mousePosition + new Vector3(positionOffset.x, positionOffset.y, 0);
        }

    }

    public void OnEndDrag(PointerEventData eventData)
    {
        dragging = false;
    }
}
``` 

Método alternativo implementar `IPointerDownHandler`

El cual implementa el siguiente método (con un ejemplo sobre posicionar correctamente el `GameObject` en el punto donde el ratón ha clicado)

```cs 
public void OnPointerDown(PointerEventData eventData)
    {
        diff = transform.position - Input.mousePosition;
        dragging = true;
    }

void Update()
    {
        if (dragging && Input.GetMouseButton(0))
        {
            transform.position = Input.mousePosition + new Vector3(diff.x, diff.y, 0);
        }

        if (Input.GetMouseButtonUp(0))
        {
            dragging = false;
        }
    }

``` 


Se tiene que implementar `IDragHandler`

Y el método

## Keywords

IPointer PointerDown Pointer IPointerDown PointerHandler IPointerHandler

PointerUp IPointerUp OnPointer