
```cs 
using System;  
using System.Collections.Generic;  
using UnityEngine;  
using UnityEngine.XR.ARFoundation;  
using UnityEngine.XR.ARSubsystems;
``` 

AR Foundation permite coordina el exportado del proyecto a Android o a iPhone
AR Subsystems es el que nos proporciona las herramientas necesarias como detección de cara, de plano, de imágenes...

```cs 
[RequireComponent(typeof(ARTrackedImageManager))]
``` 

Necesitamos tener este componente ya que es quién detecta las imágenes

```cs 
public class PlaceTrackedImages : MonoBehaviour  
{

``` 

# Keywords

Tracking images