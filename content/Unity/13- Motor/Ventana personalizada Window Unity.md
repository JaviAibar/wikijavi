> [!important] Tienes cerrar y abrir la ventana cada vez que cambies alguna cosa de la clase (variables por defecto). Esos valores no se reinician cada vez que compilas.

En la docu de [IntField de Unity](https://docs.unity3d.com/ScriptReference/EditorGUILayout.IntField.html) pone que para obtener el valor actualizado de un campo, hay que utilizar una variable estática adicional. Esto no funciona. Hay que actualizar `la misma` variable:

```cs 
windowToSpawn = EditorGUILayout.IntField("Window to Spawn", windowToSpawn);
``` 


El `typeof` del método `ShowWindow` hace referencia a `la misma clase`. Aunque podrías referenciar otra (no sé con qué intención querrías hacerlo, la verdad)

_DebuggerWindow.cs_

```cs 
[MenuItem("Window/Debugger Window")]

public static void ShowWindow()
{
    EditorWindow.GetWindow(typeof(DebuggerWindow));
}
void OnGUI()
{
    // Aquí la mayoría del código
}

private void Update()
{
    // En ocasiones podría necesitar también este
}
``` 

Obtener GameObjects es igual que siempre

```cs 
var spawner = GameObject.FindAnyObjectByType<MonsterSpawner>();
``` 

aunque también puede coger el que el tengas seleccionado con `Selection.activeGameObject`

```cs 
GUILayout.Label ("Base Settings", EditorStyles.boldLabel);
``` 

```cs 
EditorGUILayout.LabelField("Level time " + level.timeToLoop);
``` 

```cs 
frame = EditorGUILayout.IntSlider(frame, 0, frames.Count - 1);
``` 

```cs 
myBool = EditorGUILayout.Toggle ("Toggle", myBool);
``` 

```cs 
groupEnabled = EditorGUILayout.BeginToggleGroup("Optional Settings", groupEnabled);
myBool = EditorGUILayout.Toggle("Toggle", myBool);
myFloat = EditorGUILayout.Slider("Slider", myFloat, -3, 3);
EditorGUILayout.EndToggleGroup();
``` 

```cs 
if (GUILayout.Button("Play"))
    EditorApplication.EnterPlaymode();
    ``` 
# Elementos comunes

