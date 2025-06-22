`WebCamTexture` es la encargada de manejar de quién será obtenida la imagen, pero para mostrarla por pantalla necesitamos un `RawImage`

Lo primero es crear un objeto `WebCamTexture`. Para indicarle de qué dispositivo tiene que leer, podremos acceder al campo estático `WebCamTexture.devices`

Ahí están listados todos los nombres p.e. (`WebCamTexture.devices[0].name`)

Entonces se hace lo siguiente 

```cs 
webcamTex = new WebCamTexture(WebCamTexture.devices[0].name, 640, 640)
``` 


Este `webcamTex` lo podemos pasar tal cual al `RawImage` que tengamos en el canvas 

```cs 
camRenderer.texture = webcamTex;
``` 


Y ya solo quedaría activar la 

```cs 
camara webcamTex.Play();
``` 

Si quieres cambiar de dispositivo, cambia el nombre 

```cs 
webcamTex.deviceName = WebCamTexture.devices[value].name
``` 

y vuelve a darle 

```cs 
webcamTex.Play()
``` 

# Package

Puedes descargar una implementación desde mi [Drive](https://drive.google.com/file/d/1r_r2-hWwlABAb2COPXW07sJ_eciiX_IX/view?usp=share_link) desarrollada para Unity 2021.3.17f1 y minAndroidSDK=23

o copiar el siguiente código:

```cs 
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ShowWebcam : MonoBehaviour
{
    public RawImage camRenderer;
    public TMP_Dropdown camerasDropdown;
    private WebCamTexture webcamTex;
    public int camWidth = 640;
    public int camHeight = 640;

    void Start()
    {
        if (camRenderer == null)
            camRenderer = GetComponent<RawImage>();
        if (camerasDropdown != null) 
            FillCamsDropdown();
        webcamTex = new WebCamTexture(WebCamTexture.devices[1].name, camWidth, camHeight);
        camRenderer.texture = webcamTex;
        StartCamera();
    }

    private void OnEnable()
    {
        camerasDropdown.onValueChanged.AddListener(CameraChanged);
    }

    private void OnDisable()
    {
        camerasDropdown.onValueChanged.RemoveListener(CameraChanged);
    }

    private void CameraChanged(int value)
    {
        webcamTex.deviceName = WebCamTexture.devices[value].name;
        camRenderer.texture = webcamTex;
        webcamTex.Play();
    }
    private void FillCamsDropdown()
    {
        string[] devices = WebCamTexture.devices.ToList().Select(e => e.name).ToArray();
        foreach (string d in devices)
            camerasDropdown.options.Add(new TMP_Dropdown.OptionData(d));
        camerasDropdown.value = 0;
    }
    public void StartCamera()
    {
        webcamTex.Play();
    }
    public void StopCamera()
    {
        webcamTex.Stop();
    }
}
``` 

Keywords: Android