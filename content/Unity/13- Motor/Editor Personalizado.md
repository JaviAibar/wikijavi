Deben ir en la carpeta Editor, la cual el propio Unity excluye de la compilación.

Tomemos el siguiente ejemplo de la [guía de Unity](https://docs.unity3d.com/Manual/editor-CustomEditors.html) (si no lo han quitado ya xD)


# Keywords

Custom Editores Ventanas Window Windows

```cs 
//C# Example (LookAtPoint.cs)
using UnityEngine;
public class LookAtPoint : MonoBehaviour
{
    public Vector3 lookAtPoint = Vector3.zero;

    void Update()
    {
        transform.LookAt(lookAtPoint);
    }
}
``` 

```cs 
[CustomEditor(typeof(LookAtPoint))]
[CanEditMultipleObjects]
public class LookAtPointEditor : Editor 
{
    SerializedProperty lookAtPoint;
    
    void OnEnable()
    {
        lookAtPoint = serializedObject.FindProperty("lookAtPoint");
    }

    public override void OnInspectorGUI()
    {
        serializedObject.Update();
        EditorGUILayout.PropertyField(lookAtPoint);
        serializedObject.ApplyModifiedProperties();
    }
}
``` 

