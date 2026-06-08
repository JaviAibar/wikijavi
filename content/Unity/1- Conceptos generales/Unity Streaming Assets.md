Como en Android no se pueden pillar archivos desde el móvil directamente, pues se lía parda.

Para guardar por defecto archivos en StreamingAssets se puede crear una carpeta en Assets con el mismo nombre. Estos archivos quedarán expuestos para los usuarios pudiéndolos modificar, crear o borrar. Estos archivos quedarán ocultos dentro de Unity y no se podrán usar directamente en el proyecto.

La ruta para acceder a los archivos debe ser: 

```cs
"file://" + Application.streamingAssetsPath + "/subcarpetas/" + "archivo.extension"
``` 

```cs 
Como se van a hacer peticiones web y eso es inestable de la ostia hay que hacer una Coroutine con una estructura tal que así:
private IEnumerator CargarArchivoCoroutine()
{
	using (UnityWebRequest uwr = UnityWebRequest.Get("path"))
	{
		yield return uwr.SendWebRequest();
		
		if (uwr.result == UnityWebRequest.Result.ConnectionError || 
		    uwr.result == UnityWebRequest.Result.ProtocolError)
			Debug.Log(uwr.error);
		else
		{
			Mucho código
		}
	}
}
``` 

Por alguna razón para diferentes tipos de archivo hay que hacer diferentes procedimientos. Los más comunes:

- Textura:
    

- En lugar de usar `UnityWebRequest` hay que usar: 
```cs 
UnityWebRequest uwr = UnityWebRequestTexture.GetTexture("path");
``` 

- Para acceder a la textura: 
```cs 
Texture tex = DownloadHandlerTexture.GetContent(uwr)
```     

- Audio Clip:
    

- En lugar de usar `UnityWebRequest` usar: 
```cs 
UnityWebRequest uwr = UnityWebRequestMultimedia.GetAudioClip("path",  AudioType.EL_QUE_PROCEDA)
``` 

- Para acceder: 
 
```cs 
AudioClip clip = DownloadHandlerAudioClip.GetContent(uwr)
``` 

- Bytes y Textos:
    
- Usar UnityWebRequest.
    
- Acceder con: 
- 
```cs
uwr.downloadHandler.data y uwr.downladHandler.text respectivamente
``` 


Para otro tipo de archivos aquí la solución 👇 :

## Asset Bundle

Los asset Bundles son packs de recursos que Unity puede cargar en tiempo de ejecución. Puede contener cualquier tipo de asset (modelos, materiales, prefabs, serializable objects, escenas) pero no código. Si alguno de los elementos dentro del bundle necesita código (un GameObject con un componente asignado por ejemplo) buscará el código dentro de los Assets de la build.

Para cargar Asset Bundles desde Streaming Assets:

- Usar UnityWebRequestAssetBundle
    
- Acceder con: 
```cs 
AssetBundle bundle = DownloadHandlerAssetBundle.GetContent(uwr);
```    

Esto devuelve un objeto AssetBundle. Para acceder a sus recursos usar `.LoadAsset<Type>("Nombre del asset")`. Ejemplo:

```cs 
 GameObject go = bundle.LoadAsset<GameObject>("Mi Game Object");
``` 

# Keywords

AssetBundle AssetBundles