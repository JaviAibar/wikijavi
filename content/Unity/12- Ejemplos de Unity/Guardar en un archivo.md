Una buena forma es mediante una clase preparada para serializarse, que nos servirá como el objeto del que obtendremos la info

```cs 
[Serializable]
public class ConfigFile
{
    public float dato1;
    public float dato2;
    public float dato3;

    public ConfigFile(float dato1, float dato2, float dato3)
    {
        this.dato1 = dato1;
        this.dato2 = dato2;
        this.dato3 = dato3;
    }
    public ConfigFile() { }
}
``` 

Y el método que guarda

```cs 
public void SaveValues()
    {
        // TODO: Are you sure? window
        string filename = "config.json";
        ConfigFile configFile = new ConfigFile();
// Obtain data from 
        configFile.dato1 = string.IsNullOrEmpty(dato1Field.text) ? defaultOptions.dato1 : float.Parse(dato1Field.text);
        configFile.dato2 = string.IsNullOrEmpty(dato2Field.text) ? defaultOptions.dato2 : float.Parse(dato2Field.text);
        configFile.dato3 = string.IsNullOrEmpty(dato3Field.text) ? defaultOptions.dato3 : float.Parse(dato3Field.text);
        string jsonString = JsonUtility.ToJson(configFile);
        
// Create / update save file
        File.WriteAllText(Application.persistentDataPath + "/" + filename, jsonString);
    }
    ``` 


El método que carga

```cs 
public void LoadValues()
    {
        string filename = "config.json";
        if (File.Exists(Application.persistentDataPath + "/" + filename))
        {
            string jsonString = File.ReadAllText(Application.persistentDataPath + "/" + filename);
            ConfigFile configFile = JsonUtility.FromJson<ConfigFile>(jsonString);
            dato1Field.text = "" + configFile.dato1;
            dato2Field.text = "" + configFile.dato2;
            dato3Field.text = "" + configFile.dato3;
        }
        else
        {
            ResetValuesToDefault();
        }
    }
    ``` 
    
Ejemplo completo usando un transform

```cs 
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class SavesManager : MonoBehaviour
{
    [SerializeField] private Transform playerPos;

    private void Start()
    {
        LoadValues();
    }
    public void SaveValues()
    {
        // TODO: Are you sure? window
        string filename = "savefile.json";
        ConfigFile configFile = new ConfigFile();
        // Obtain data from 
        configFile.playerPos = playerPos.position;
        configFile.playerRot = playerPos.eulerAngles;
        string jsonString = JsonUtility.ToJson(configFile);

        // Create / update save file
        File.WriteAllText(Application.persistentDataPath + "/" + filename, jsonString);
        print("Saved in " + Application.persistentDataPath + "/" + filename);
    }

    public void LoadValues()
    {
        string filename = "savefile.json";
        if (File.Exists(Application.persistentDataPath + "/" + filename))
        {
            string jsonString = File.ReadAllText(Application.persistentDataPath + "/" + filename);
            ConfigFile configFile = JsonUtility.FromJson<ConfigFile>(jsonString);
            playerPos.position = configFile.playerPos;
            playerPos.eulerAngles = configFile.playerRot;
            print("Cargado " + Application.persistentDataPath + "/" + filename);
        }
        else
        {
            print("No existe " + Application.persistentDataPath + "/" + filename);

        }
    }
}

[Serializable]
public class ConfigFile
{
    public Vector3 playerPos;
    public Vector3 playerRot;
    public int lifes;

    public ConfigFile(Vector3 playerPos, Vector3 playerRot, int lifes)
    {
        this.playerPos = playerPos;
        this.playerRot = playerRot;
        this.lifes = lifes;
    }
    public ConfigFile() { }
}

``` 

Ahora lo mismo pero mediante bytes

```cs 
private bool WriteFile (string lan, string file, LanLibraryEditor data, bool replace = false)
    {
        string path = $"{Application.dataPath}/{GetLanPath()}/{lan}/{file}.lan";
        if (!File.Exists(path) || replace || EditorUtility.DisplayDialog("El archivo ya existe",
            $"El archivo {file}.lan ya existe en el idioma {lan}. ¿Deseas reemplazarlo?", "Reemplazar", "Cancelar"))
        {
            File.WriteAllText(path, data.ToString());
            return true;
        }

        return false;
    }
private void ReadFile (string lan, string file)
    {
        string path = $"{Application.dataPath}/{GetLanPath()}/{lan}/{file}.lan";
        if (!File.Exists(path))
        {
            EditorUtility.DisplayDialog("No se encuentra el archivo",
                $"El archivo {file}.lan no se encuentra en el idioma {lan}.", "Aceptar");
        }

        string data = File.ReadAllText(path);
        library = new LanLibraryEditor(data);
    }


// Convert an object to a byte array
private byte[] ObjectToByteArray(Object obj)
{
    if(obj == null)
        return null;

    BinaryFormatter bf = new BinaryFormatter();
    MemoryStream ms = new MemoryStream();
    bf.Serialize(ms, obj);

    return ms.ToArray();
}

// Convert a byte array to an Object
private Object ByteArrayToObject(byte[] arrBytes)
{
    MemoryStream memStream = new MemoryStream();
    BinaryFormatter binForm = new BinaryFormatter();
    memStream.Write(arrBytes, 0, arrBytes.Length);
    memStream.Seek(0, SeekOrigin.Begin);
    Object obj = (Object) binForm.Deserialize(memStream);

    return obj;
}
``` 

