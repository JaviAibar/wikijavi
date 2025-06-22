Para ver Testing con Zenject [mirar aquí](https://sites.google.com/view/wikijavi/unity/medio/unity-zenject-gu%C3%ADa-r%C3%A1pida#h.mv6rogotfhvv)

> [!note] Para ver Testing con Zenject [[Unity/2- Técnicas/Zenject/Unity Zenject GUÍA RÁPIDA|Unity Zenject GUÍA RÁPIDA#Testing|Testing]]

# PlayMode vs EditMode

Tenemos dos opciones, la de Play y la de Edit.

El PlayMode está pensado para codigo que necesita ser ejecutado en una escena en play. Y el EditMode es para codigo que puede ejecutarse en cualquier otro sitio. Dicho de otra forma, PlayMode es para las clases que heredan de MonoBehaviour y EditMode para las que no.

Los atributos que se utilizan son: `[Test]` para EditMode y `[UnityTest]` para PlayMode

# Configurar el entorno

Creamos una carpeta en el proyecto llamada Tests

Abrimos la ventana Test Runner (`Window > General > Test Runner`)

Seleccionamos la carpeta Tests y click en Create EditMode Test Asembly Folder

![[Pasted image 20250622150228.png]]

Ahora podemos crear nuestro primer script de pruebas, ahora la ventana habrá cambiado y deberemos clicar en Create Test Script in current folder

![[Pasted image 20250622150248.png]]

Necesitamos que todos los scripts a testear estén asociados a un [[Assembly]] para que dichos tests puedan acceder al código a probar. Por esa razón, en la carpeta donde esté el código a probar, deberemos crear un assembly. Una vez creado, volvemos al assembly **de los pruebas, no el que acabamos de crear** y añadimos la referencia (ahora sí) al que acabamos de crear. Es decir, tenemos 2 assemblies, uno se crea automáticamente al crear la carpeta de test, el otro lo creamos manualmente junto al código que queremos probar. En el que se ha creado automático, añadimos la referencia del que está junto a nuestro código.

>[!warning] Muy importante
>Muy importante fijarnos que Assembly References esté `nunit.framework.dll`

![[Pasted image 20250622150610.png]]

Y clicamos aplicar

# La primera prueba

## EditMode

Abrimos el script que creamos antes.

Podemos cambiar el nombre de los métodos y crear más sin problema. Lo único es que esté etiquetado con el [[Atributos|atributo Test]] (Los atributos que se utilizan son: `[Test]` para EditMode y `[UnityTest]` para PlayMode)

Consisten en Assertion (en español afirmación o aseveración) en el cual el primer valor es el esperado, y el segundo el obtenido. ejemplos:

```cs 
// Prueba EditMode
[Test]
public void UpTest() 
{
    Assert.AreEqual(new Vector3(0, 1, 0), Direction.Up);
}
``` 

## PlayMode

Para el PlayMode debemos tener en cuenta que debemos esperar a que la acción realmente ocurra, por lo que en la línea de `yield return`, debemos esperar el tiempo correspondiente (una shit, la verdad)

```cs 
// Prueba PlayMode
public IEnumerator MoveUpTest()
{
    var gameObject = new GameObject();
    var sheep = gameObject.AddComponent<Sheep();
    sheep.MoveUp();
    yield return new WaitForSeconds(sheep.JumpDuration);

    Assert.AreEqua(new Vector3(0, 1, 0), sheep.transform.position);
}
``` 

## Carga de Prefabs

En el ejemplo anterior hemos creado un GameObject con todos los componentes necesarios, pero esto es poco escalable a medida que el GameObject se haga más complejo. Para evitar esto, podemos instanciar los prefabs directamente con Addressables.

Instalamos Addressables

![[Pasted image 20250622150827.png]]

Añade Unity.Addressables y Unity.ResourceManager al assembly de test

![[Pasted image 20250622150838.png]]

Ve al prefab y activa en la parte de arriba del inspector, la casilla "Addressable" y le asignamos una ruta única

![[Pasted image 20250622150846.png]]

Lo cargamos con este método `LoadAssetAsync<GameObject>()` y con `yield return new WaitUntil(() => zombieTask.IsCompleted)` esperamos a que cargue (ambas tareas son imprescindibles) con `zombieTask.Result` obtenemos finalmente el GameObject (Prefab) a instanciar

### Alternativa

Aunque los Addressables son la mejor opción por lo comentado[[Addressable|aquí]], si queremos evitar añadir esa dependencia, podemos depender de la carpeta Resources, pero en lugar de meter todos los prefabs en esa carpeta, ponemos solo un prefab que tenga la referencia de todos los demás prefabs

![[Pasted image 20250622150955.png]]

## Usar una escena predefinida

Pero mejor incluso que instanciar prefabs sería que esos prefabs (por lo menos los iniciales) estuvieran ya en la escena

Y esto es bastante más fácil

Podemos tanto crear una escena dedicada a ciertas pruebas como usar nuestras escenas reales de juego y simplemente cargarlas e, importante, esperar a que cargue igual que hacíamos con la instancia de los prefabs `yield return new WaitUntil(() => task.isDone)`



En este ejemplo estoy cargando una escena real y poniendo a prueba que efectivamente pueda interactuar con los elementos preexistentes.

Obtengo un GameObject de la escena, lo desactivoy lo vuelvo a activar. Inicio el host y espero para ver los cambios.

```cs 
[UnityTest]
public IEnumerator MiPruebaQueRequiereUnaEscena()
{
    // Cargar la escena de prueba
    var task = SceneManager.LoadSceneAsync("Room");

    yield return new WaitUntil(() => task.isDone);

    UnityEngine.Debug.Log("ANTES DE INICIAR");
    // Resto de la lógica de la prueba
    yield return new WaitForSeconds(3);
    var hud = GameObject.Find("Network Helper HUD");
    hud.SetActive(false);

    yield return new WaitForSeconds(3);
    hud.SetActive(true);
    yield return new WaitForSeconds(3);

    NetworkManager.Singleton.StartHost();
    UnityEngine.Debug.Log("TRAS INICIAR");
    yield return new WaitForSeconds(3);

}
``` 

# Campos privados configurados con el inspector

Es decir, los campos que son 

```cs
[SerializeField] private AudioSource m_ThunderAudioSource;
```

Componente a probar

```cs 
public class ClockAudioManager : MonoBehaviour
{
    [SerializeField] private AudioSource m_ClockAudioSource;

    public void PlayClock()
    {
        m_ClockAudioSource.Play();
    }
}
``` 

Asignación de las referencias por código

```cs 
var audioManagerGO = new GameObject();

audioSource1 = audioManagerGO.AddComponent<AudioSource>();
audioSource1.clip = AudioClip.Create("clip1", 1, 1, 1000, false);

clockAudioManager = audioManagerGO.AddComponent<ClockAudioManager>();

var so = new SerializedObject(clockAudioManager);
so.FindProperty("m_ClockAudioSource").objectReferenceValue = audioSource1;
so.ApplyModifiedProperties();
``` 

# Editar variables privadas y ejecutar métodos privados

Si tienes que usar esto, probablemente estés haciendo algo mal, ya que no estás probando el código como una API. Probablemente estás intentando hacer testing de caja blanca o tu código sea demasiado espagueti. Si aún así lo necesitas, [[Reflexion Reflection|tendrás que usar reflection]]

# Code Coverage

Esta es una herramienta que te indica qué partes de tu código han sido probadas y cuales no. Está en la Unity Registry. Ya solo con la documentación se aprende muchísimo de pruebas unitarias así que está recomendadísimo

Instala también el Samples y lee el archivo Worksheet

![[Pasted image 20250622151258.png]]

# Trucos

## Tests parametrizados

Tomará **todos** los valores de values y los probará con todos los valores de values2

```cs 
static int[] values = new int[] { 1,3, 2, 4 , 5};
static int[] values2 = new int[] { 5, 6 };

[Test]
public void PlayTestsSimplePasses2([ValueSource(nameof(values))] int a, [ValueSource(nameof(values2))] int b)
{
    Assert.Less(a, b);
}
``` 

También lo puedes hacer a lo **bruto**, especialmente si los valores son **exclusivos** de una prueba

```cs 
public class MyTestsClass
{
   [Test]
   public void Test(
       [Values("a", "b")] string someString,
       [Values(5, 10)] int someInt)
   {
       Assert.Pass();
   }
}
``` 

## SetUp y TearDown

Probablemente, siempre que hagas pruebas, tendrás dos fases que siempre se repiten: La de **configuración**, donde instancias el GameEngine y demás y otra de **limpieza** para destruir dicho GameEngine y demás

Puedes crear estos dos métodos para hacer estas tareas que se repetirás siempre que ejecutes un test en ESTE archivo de tests

Lo suyo es que agrupes los tests en base a qué inicializas y siempre hay que borrar los objetos estos porque **te la lian** entre ejecución y ejecución por culpa de los duplicados

```cs 
[SetUp]
public void Setup()
{
    GameObject gameGameObject = 
        MonoBehaviour.Instantiate(Resources.Load<GameObject>("Prefabs/Game"));
    game = gameGameObject.GetComponent<Game>();
}

[TearDown]
public void Teardown()
{
    Object.Destroy(game.gameObject);
}
``` 

## Ignorar un conjunto de prueba

Podrías verte en la necesidad de ignorar un caso de prueba **si un valor no te interesa**

El ejemplo de Unity (el de la imagen) es un poco roñosete, pero podrías ejecutarlo con **un for** de 1 a 10 pero que **el 5 (por ejemplo) no te venga bien**, pues lo ignoras y au

```cs 
public class MyTestsClass
{
   [Test]
   [ParameterizedIgnore("b", 10)]
   public void Test(
       [Values("a", "b")] string someString,
       [Values(5, 10)] int someInt)
   {
       Assert.Pass();
   }
}
``` 

# Bibliografía

[https://www.youtube.com/watch?v=PDYB32qAsLU&t=383s&ab_channel=InfallibleCode](https://www.youtube.com/watch?v=PDYB32qAsLU&t=383s&ab_channel=InfallibleCode) 

[https://www.kodeco.com/9454-introduction-to-unity-unit-testing](https://www.kodeco.com/9454-introduction-to-unity-unit-testing) 

[https://docs.unity3d.com/Packages/com.unity.test-framework@2.0/api/UnityEngine.TestTools.ParameterizedIgnoreAttribute.html](https://docs.unity3d.com/Packages/com.unity.test-framework@2.0/api/UnityEngine.TestTools.ParameterizedIgnoreAttribute.html) 

[https://forum.unity.com/threads/unit-testing-monobehaviour-classes-that-have-private-fields-set-from-the-inspector.594451/](https://forum.unity.com/threads/unit-testing-monobehaviour-classes-that-have-private-fields-set-from-the-inspector.594451/) 

(no incluido en la página, pero muy interesante) [https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#characteristics-of-a-good-unit-test](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#characteristics-of-a-good-unit-test) 

(no incluido en la página, pero muy interesante) [https://unity.com/es/how-to/testing-and-quality-assurance-tips-unity-projects](https://unity.com/es/how-to/testing-and-quality-assurance-tips-unity-projects)