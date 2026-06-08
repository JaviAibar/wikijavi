## ¿Qué es y porque me importa esto?

Permite la carga y descarga de assets por bloques de forma asíncrona, de tal forma que

1. Se pueda comenzar a jugar sin que el juego se haya descargado al 100%
    
2. Optimiza la cantidad de memoria utilizada ya que no necesita tener todos los `Assets` cargados a la vez. p.e. no hace falta cargar los assets de la zona del boss si estás en el tutorial
    
3. Acelera el inicio del juego
    
4. Las cosas que carga o que se descarga, se cachean, por lo que acelera una posible recarga de dichos assets
    

## ¿Como ponerlo en marcha?

1. Descargar el paquete `Addressables` del `Package Manager` 
    

2. Para que se monte la wea, debemos abrir el menú `Window > Asset Management > Addressables > Groups` y le damos a crear, lo cual nos montará la estructura de archivos que necesita por defecto

![[Pasted image 20250622144424.png]]

Abrimos la carpeta `AddressableAssetsData` y clicamos `AddressableAssetSettings`, en el Inspector clicamos en `Manage Profiles`

Y creamos un pack

![[Pasted image 20250622144529.png]]

## Referencias / AssetReference / Añadir assets a un perfil

Una `AssetReference` es una referencia a un `AddressableAsset` que podrá ser cargado e instanciado tal y como se carga un prefab

Para añadir assets a un perfil, se selecciona el asset concreto, y en el inspector arriba se clica al checkbox `Addressable` y tada

## Cargar un asset desde una referencia

El siguiente código carga un asset

```cs 
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

public class AssetReferenceUtility : MonoBehaviour
{
    public AssetReference objectToLoad;
    public AssetReference accessoryObjectToLoad;
    private GameObject instantiatedObject;
    private GameObject instantiatedAccessoryObject;
    void Start()
    {
        Addressables.LoadAssetAsync<GameObject>(objectToLoad).Completed += ObjectLoadDone;
    }
    private void ObjectLoadDone(AsyncOperationHandle<GameObject> obj)
    {
        if (obj.Status == AsyncOperationStatus.Succeeded)
        {
            GameObject loadedObject = obj.Result;
            Debug.Log("Successfully loaded object.");
            instantiatedObject = Instantiate(loadedObject);
            Debug.Log("Successfully instantiated object.");
            if (accessoryObjectToLoad != null)
            {
                accessoryObjectToLoad.InstantiateAsync(instantiatedObject.transform).Completed += op =>
                {
                    if (op.Status == AsyncOperationStatus.Succeeded)
                    {
                        instantiatedAccessoryObject = op.Result;
                        Debug.Log("Successfully loaded and instantiated accessory object.");
                    }
                };
            }
        }
    }
}
``` 

y en el GameObject que contenga este script, se asignará el prefab que cargue

## Me da error

Comprueba que has clicado el tick de `Addressable` en la parte de arriba del `Asset`

## Bibliografía

[https://learn.unity.com/project/getting-started-with-addressables?uv=2019.3](https://learn.unity.com/project/getting-started-with-addressables?uv=2019.3)

## Nota

Esta información está actualizado a junio de 2022 y tiene como objetivo la versión 2019.3 de Unity