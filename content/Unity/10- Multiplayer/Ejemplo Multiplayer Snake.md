# Explicación del proyecto

Esta actualización (abril del 2023) está basada en [el vídeo de youtube](https://youtu.be/swIM2z6Foxk) que sale en la bibliografía. Se trata de un proyecto 2D clon de Slither.io: El Snake de toda la vida pero multijugador.

La versión anterior de esta guía era sobre un juego 3D, y creo que la complejidad que añade no merece la pena

Esto creo que es lo que ofrece Unity (no sé si es de pago)

![[Pasted image 20250624185726.png]]

![[Pasted image 20250624185733.png]]

Para ver la instalación del entorno multiplayer incluído los requisitos y el ParrelSync, puedes visitar la subpágina de [Instalación entorno multiplayer](https://sites.google.com/view/wikijavi/unity/avanzado/networking-nuevo/instalaci%C3%B3n-entorno-multiplayer) #CambiarURL 

# Desarrollo del programa

## NetworkManager

Lo primero que vamos a crear es un `Network Manager` la interfaz para crear un servidor, host o cliente, también se encargará de gestionar un poco todo el tema redes y de spawnear personajes y demás

Creamos un `GameObject` con el componente `NetworkManager`

![[Pasted image 20250624185827.png]]

En ese mismo GO, abajo, tenemos que seleccionar UnityTransport (el año pasado poníamos UNetTransport, ni idea de la diferencia - aunque sospecho que Unity Transport es para conectarse a UGS (Unity Gaming Services)). Según acabo de leer, UNet está deprecated

> [!note] Info extra que puedes saltar
>Este es el que envía los paquetes, y aquí podremos definir qué tamaño máximo tienen los packs, el tiempo en el que te echa (timeout), heartbeat timeout (que mide si sigues activo) entre otras

Aquí puedes configurar también la ip y puerto y simular ping, jitter hacer una variación aleatoria y demás cosas de debug

Para configurar por código la ip

```cs 
UnityTransport ut = NetworkManager.Singleton.GetComponent<UnityTransport>();
ut.ConnectionData.Address = "127.0.0.1"; //localhost
ut.SetConnectionData("127.0.0.1", 7777);
``` 

Comprueba en el `NetworkManager` que tiene activado `Enable Scene Management` en caso contrario, tendrás que gestionar las escenas manualmente (no estoy seguro qué significa exactamente)

![[Pasted image 20250624190005.png]]

El GO que manejará el jugador va en `Player Prefab` y todos los GO que deberán ser sincronizados (monedas, puertas, botones, etc, incluído el `Player Prefab`) ^listaPrefabs

> [!warning] DIFERENCIA CON VIDEO
> Deberán ir en una lista dentro de un `.asset`. Puedes crear tantas listas como quieras.

![[Pasted image 20250624190105.png]]

Dentro del `.asset` se ve tal y como era antes, un array normal y corriente llamado `Network Prefabs`.

![[Pasted image 20250624190132.png]] 

  
**Tick Rate** es cada cuánto se ejecuta el Network Manager y, por tanto, envía info a los clientes. Cada cuanto se actualiza el estado del juego. Cuanto más alto, más suave irá, pero mejor internet y PC necesitas.

**Ensure Network Variable Length Safety** sirve para posible errores de escritura accidental del cliente, requiere + CPU pero te podría salvar si lo necesitas

![[Pasted image 20250624190152.png]]

Para iniciar el servidor deberás dar ==Play== y luego a `Start Host`

![[Pasted image 20250624190311.png]]

## Player Prefab (Network Object)

Creamos un `prefab` de jugador, que será el personaje que hará `spawn` cada vez que alguien se conecte

Le añadimos `NetworkObject`. Este componente se lo pondremos a todos los objetos que serán sincronizados (los que iban en la lista `Network Prefabs` dentro del GO `NetworkManager` [[Ejemplo Multiplayer Snake#^listaPrefabs|explicado en el punto anterior]]) 

**Always Replicate As Root** - ==Importante== - Creo haber entendido que, si lo activas, los hijos de este Prefab no seguirán al padre como normalmente hacen, sino que seguirán el sistema de coordenadas del mundo.

**Dont Destroy With Owner** - Si el padre es destruído, el transform de sus hijos pasará al servidor

**Auto Object Parent Sync** - sincronizará los movimiento con los del padre

*Player GO*
![[Pasted image 20250624192342.png]]

# Código

## PlayerController (p1) (OnNetworkSpawn)

Vamos a crear un script llamado `PlayerController`

Lo primero que debemos hacer es cambiar de `MonoBehaviour` a `NetworkBehaviour` básicamente es MonoBehaviour pero con cosas de Network. Luego se ha desarrollado el movimiento de forma típica en Unity. La única particularidad es que en lugar de `Start`, se ha usado `OnNetworkSpawn` (Explicado en el comentario del código)

Para ver cómo proceder, vamos a hacer un ejemplo de movimiento ==TEMPORAL== en el que la posición se maneje **Client authoritative** (concepto que vimos en las [[Networking - Netcode for GameObjects (NGO))#Definiciones|definiciones]]) porque es más easy de entender de entrada

>[!warning]- Este código está incompleto (completo más abajo)

```cs 
using Unity.Netcode;
using UnityEngine;

public class PlayerController : NetworkBehaviour
{
    private Camera _mainCamera;
    [SerializeField] private float speed = 3f;
    private Vector3 _mouseInput;

    public override void OnNetworkSpawn()
    {
        base.OnNetworkSpawn();
        // Initialize lo hacemos en OnNetworkSpawn y no en Start ya que
        // OnNetworkSpawn a veces ocurre antes de Start, entonces para que
        // cuando se ejecute Update, estemos seguros de tener la ref de la cam
        Initialize();
    }

    public void Initialize() {
        _mainCamera = Camera.main;
    }

    private void Update() {
        if (!Application.isFocused) return;
        Vector3 mouseWorldCoordinates = Movement();
        Rotation(mouseWorldCoordinates);
    }

    private Vector3 Movement() {
        _mouseInput.x = Input.mousePosition.x;
        _mouseInput.y = Input.mousePosition.y;
        _mouseInput.z = _mainCamera.nearClipPlane;
        Vector3 mouseWorldCoordinates = _mainCamera.ScreenToWorldPoint(_mouseInput);
        transform.position = Vector3.MoveTowards(transform.position, mouseWorldCoordinates, Time.deltaTime * speed);
        return mouseWorldCoordinates;
    }

    private void Rotation(Vector3 mouseWorldCoordinates) {
        if (mouseWorldCoordinates != transform.position)
        {
            Vector3 targetDirection = mouseWorldCoordinates - transform.position;
            transform.up = targetDirection;
        }
    }
}
``` 

Lo comentado en el comentario del código, en la parte de `OnNetworkSpawn` es por esto

![[Pasted image 20250624193334.png]]

  
Podemos ver el problema de este código. Y es que ambos, el cliente y el servidor están respondiendo al mismo input.

![[Pasted image 20250624193417.png]]

El otro problema que podemos apreciar es que cuando jugamos en el cliente, no se actualiza en el host, ya que el cliente no está enviando su posición. Se mueve de forma `local`. Para transferir la posición se utiliza Network `Transform`

![[Pasted image 20250624193425.png]]



## Network Transform

Permiten transferir automaticamente la posición, rotación y escala al server (imagino que de los `Network Objects`) y solo funciona para `Server Authoritative`.

![[Pasted image 20250624193503.png]]

Para `Client Authoritative` (que es el caso que estamos desarrollando temporalmente) se usa `Client Network Transform`. Que tendrías que descargar manualmente desde [este enlace](https://github.com/Unity-Technologies/com.unity.multiplayer.samples.coop.git?path=/Packages/com.unity.multiplayer.samples.coop#main) y ponerlo con `Add from git URL`. Además de `Client Network Transform`. Trae otros scripts como animaciones para `Client Authoritative` entre otras

Hemos sacado de la sincronización todos los valores que no son necesarios para hacer las peticiones más ligeras y tenemos que asegurarnos que `Interpolate` esté activado

Los `Threshold` solo envían info si se ha movido cierta cantidad de espacio. Esto es útil para optimizar la cantidad de info que mandamos, si el juego es muy de precisión se pone más bajo y da un poco igual, pues se puede ir subiendo. Si es un juego de carreras, como se mueven rápido, no hace falta que estés enviando info como milimetro. Depende mucho del juego

**In Local Space** - Por defecto se envía en las coordenadas del mundo, si quieres que sean en local debes activar esta casilla


## PlayerController (p2) (IsOwner)

Para arreglar que cada cliente pueda controlar a su prefab y solo a su prefab, `NetworkBehaviour` provee varias propiedades. En este caso necesitamos `IsOwner`. Es decir, si el dueño de este Prefab es tu cliente, tú controlas a este prefab. Easy

En este caso, como lo que vamos a hacer es un return, entonces si `!IsOwner`, pues no lo controlar

_PlayerController.cs_
![[Pasted image 20250624193628.png]]

Ahora sí está completo (recuerda arrastrar a tu prefab de jugador!)

Recuerda también que para poder probar, debes estar en play y clicar en `Start Host` en el `Network Manager`

```cs 
using Unity.Netcode;
using UnityEngine;

public class PlayerController : NetworkBehaviour
{
    private Camera _mainCamera;
    [SerializeField] private float speed = 3f;
    private Vector3 _mouseInput = Vector3.zero;

    public override void OnNetworkSpawn()
    {
        base.OnNetworkSpawn();
        // Initialize lo hacemos en OnNetworkSpawn y no en Start ya que
        // OnNetworkSpawn a veces ocurre antes de Start, entonces para que
        // cuando se ejecute Update, estemos seguros de tener la ref de la cam
        Initialize();
    }

    public void Initialize() {
        _mainCamera = Camera.main;
    }

    private void Update() {
        if (!IsOwner || !Application.isFocused) return;
        Vector3 mouseWorldCoordinates = Movement();
        Rotation(mouseWorldCoordinates);
    }

    private Vector3 Movement() {
        _mouseInput.x = Input.mousePosition.x;
        _mouseInput.y = Input.mousePosition.y;
        _mouseInput.z = _mainCamera.nearClipPlane;
        Vector3 mouseWorldCoordinates = _mainCamera.ScreenToWorldPoint(_mouseInput);
        mouseWorldCoordinates.z = 0f;
        transform.position = Vector3.MoveTowards(transform.position, mouseWorldCoordinates, Time.deltaTime * speed);
        return mouseWorldCoordinates;
    }

    private void Rotation(Vector3 mouseWorldCoordinates) {
        if (mouseWorldCoordinates != transform.position)
        {
            Vector3 targetDirection = mouseWorldCoordinates - transform.position;
            targetDirection.z = 0f;
            transform.up = targetDirection;
        }
    }
}
``` 

La mentalidad a la hora de desarrollar un juego multijugador es la siguiente:

Todo codigo se está ejecutando en tu mismo ordenador de forma local, pero las diferentes instancias reciben información diferente (analicemos la imagen)

Este supuesto está desde el punto de vista de Client1: Para client 1, el script que ha spawneado al entrar en el servidor (referenciado como "client1" bajo el engranaje) tendrá IsOwner = true, mientras que los de client2 y server serán false.

Por otra parte tenemos que IsServer será solo true, en aquel dispositivo que sea server. Easy

![[Pasted image 20250624193725.png]]

## Network Animator

Lógicamente sirve para sincronizar animaciones

Sincroniza el Animator (el cual tiene como requisito) así que easy

_Player GO_
![[Pasted image 20250624193758.png]]

## PlayerLength (Network Variable - Metodo de Servidor y réplica en clientes)

Ahora queremos que la serpiente pueda crecer y que los demás clientes puedan ver nuestra longitud. Pero claro, si hacemos que cada circulito nuevo debe transmitir su posición, estaremos enviando muchísima información. Es más óptimo enviar la info solo de la posición de la cabeza y la longitud de la serpierte y que cada cliente haga sus cálculos

Los `Network Variable` envían la info a todas las instancias automáticamente, por lo que no hace falta que hagamos `RPC (Remote Procedure Call)` para actualizar los valores, nos podemos suscribir a los cambios (eventos) y debe ser instanciadas dentro de `NetworkBehaviour`

> [!info] Este script va en player y necesita un circle collider2D

```cs 
using System;
using System.Collections.Generic;
using Unity.Netcode;
using UnityEngine;

public class PlayerLength : NetworkBehaviour
{
    [SerializeField] private GameObject _tailPrefab;
    // short porque 16 bits son más que sufi
    // y u porque será siempre positivo.
    // Ambos por razones de optimización de mensajes
    public NetworkVariable<ushort> length = new (1); // Contando la cabeza | Server authoritative por defecto
    /*public NetworkVariable<ushort> length = new(1, NetworkVariableReadPermission.Everyone, 
        NetworkVariableWritePermission.Owner);*/ // Lo hemos convertido en Client authoritative
    private List<GameObject> _tails = new List<GameObject>();
    private Transform _lastTail;
    private Collider2D _collider2D;

    public override void OnNetworkSpawn()
    {
        base.OnNetworkSpawn();
        _tails = new List<GameObject>();
        _lastTail = transform;
        _collider2D = GetComponent<Collider2D>();
        // Esta función es para que se actualice en los clientes.
        // El servidor no debe ejecutarlo, porque ya lo está ejecutando
        if (!IsServer) length.OnValueChanged += LengthChanged;
    }

    // Solo ejecutado por el cliente, esto son instanciará en los clientes
    // las partes de cola que añada el servidor
    private void LengthChanged(ushort previousValue, ushort newValue)
    {
        print("LengthChanged");
        InstantiateTail();
    }

    // Solo ejecutado por el servidor porque length es server authoritative
    [ContextMenu("Add length")]
    public void AddLength()
    {
        length.Value++;
        InstantiateTail();
    }

    private void InstantiateTail()
    {
        GameObject tailGO = Instantiate(_tailPrefab, transform.position, Quaternion.identity);
        tailGO.GetComponent<SpriteRenderer>().sortingOrder = -length.Value;
        if (tailGO.TryGetComponent(out Tail tail) )
        {
            tail.networkOwner = transform;
            tail.followTransform = _lastTail.transform;
            _lastTail = tailGO.transform;
            Physics2D.IgnoreCollision(tailGO.GetComponent<Collider2D>(), _collider2D);
        }
        _tails.Add(tailGO);
    }
}
``` 



## Tail

Consiste en un script de que sigue a la anterior parte, para crear un efecto de cadena con la cola de la serpiente

> [!important] Nada multiplayer

```cs 
using UnityEngine;

public class Tail : MonoBehaviour
{
    public Transform followTransform;
    public Transform networkOwner;
    [SerializeField] private float moveStep = 10f;
    [SerializeField] private float timeDelay = 0.1f;
    [SerializeField] private float distance = 0.3f;

    private Vector3 _targetPosition;

    private void Update()
    {
        _targetPosition = followTransform.position - followTransform.forward * distance;
        _targetPosition += (transform.position - _targetPosition) * timeDelay;
        _targetPosition.z = 0;
        transform.position = Vector3.Lerp(transform.position, _targetPosition, Time.deltaTime * moveStep);
    }
}
``` 

## Food (Despawn)

Esto será el elemento que comerán las serpientes y hará que se alargue la cola

```cs 
using Unity.Netcode;
using UnityEngine;

public class Food : NetworkBehaviour
{
    public GameObject prefab;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (!collision.CompareTag("Player")) return;

        if (!NetworkManager.Singleton.IsServer) return; // Solo el servidor puede llamar a AddLength

        if (collision.TryGetComponent(out PlayerLength playerLength))
        {
            playerLength.AddLength();
        }
        // A pesar de lo que dice la chica en el vídeo, esto no hace falta, ya que Despawn ya hace el efecto y se replica a los clientes
        //NetworkObjectPool.Singleton.ReturnNetworkObject(NetworkObject, prefab);
        NetworkObject.Despawn(); // Este NetworkObject se refiere al propio Food, no a la clase
    }
}
``` 

> [!info] Ten en cuenta
> Ella le pone al prefab de food Rigidbody con masa y gravedad = 0 y congeladas las variables de pos y rotacion. Yo lo tengo en Player
>
>Necesita también un collider 2d

## Food Spawner (Pool de NetworkObjects)

El código de la pool lo coge de este [enlace de Unity](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/object-pooling/index.html) pero lo puedes descargar también de [mi Drive](https://drive.google.com/file/d/1_JTLU8cawxp2rWpDCIytGAP1oiwR9y4g/view?usp=share_link)

Al añadirlo preguntará si queremos añadir `Network Object`, le decimos sí

Añadimos un elemento a la lista, que contendrá nuestro prefab pooleado.

> [!info] Prewarm es cuántas instancias queremos que haya en la pool

_Pool Manager GO_
![[Pasted image 20250624194146.png]]

## UI

> [!info] Código en el canvas

Responde a un evento lanzado en `PlayerLength` cada vez que crece (`LengthChanged`)

_UIPlayerStats.cs_
```cs 
[SerializeField] private TMP_Text text;
private void OnEnable()
{
    PlayerLength.ChangedLengthEvent += PlayerLength_ChangedLengthEvent;
}

private void OnDisable()
{
    PlayerLength.ChangedLengthEvent -= PlayerLength_ChangedLengthEvent;
}

private void PlayerLength_ChangedLengthEvent(ushort obj)
{
    text.text = obj.ToString();
}
``` 

## Audio

Para hacer esta parte ha decidido usar el patrón Singleton basado en un código polimórfico disponible [en github](https://gist.github.com/sam-yam/4a5a0460f51e2f7c066cb644504f8de0) o en [mi Drive](https://drive.google.com/file/d/1knfQf8R8ja8cts2RltblVB8SOsOFJRtp/view?usp=share_link)

> [!important] Sin multiplayer

```cs 
using UnityEngine;

[RequireComponent(typeof(AudioSource))]
public class ClientSoundPlayer : Singleton<ClientSoundPlayer>
{
    private AudioSource _audioSource;
    [SerializeField] private AudioClip _audioClip;
    public override void Awake()
    {
        base.Awake();
        _audioSource = GetComponent<AudioSource>();
        _audioSource.clip = _audioClip;
    }

    public void PlaySound()
    {
        _audioSource.Play();
    }
}
``` 

Desde LengthChanged, llamamos a ClientSoundPlayer.Instance.PlaySound()

Solo lo oye el que come, ya que LengthChanged la ejecuta la parte de LengthChanged que es Owner

>[!warning] Este sí tiene código multiplayer

_PlayerLength.cs_
```cs 
private void LengthChanged(ushort previousValue, ushort newValue)
{
    print("LengthChanged");
    InstantiateTail();

    if (!IsOwner) return;
    ClientSoundPlayer.Instance.Play();
    if (ChangedLengthEvent != null)
        ChangedLengthEvent.Invoke(length.Value);
}
``` 

## Player Collision (ServerRPC y ClientRPC)

En este paso vamos a cambiar a lo que haga falta a `Server Authoritative` y veremos la autorización de conexión (`connection approval`)

Supongamos que el cliente1 hace una llamada en local a `OnCollisionEnter` y, en lugar de ver quién ha ganado en el cliente, le pedimos al servidor que lo aclare, porque queremos que sea `Server Authoritative`, que esté a cargo. Y el cliente no pueda hacer trampichuelas.

Para ello necesitamos `RPC (Remote Procedure Call)` y quiere decir que es una llamada del cliente pero que se ejecuta en el servidor una vez determina quién ha ganado, lo comunica a los clientes mediante `ClientRPC` que es llamado por el servidor pero ejecutado en los clientes

Una forma de entenderlo es pensar que lo que ponga delante de `RPC`, es quien se encarga de ejecutar. Lo opuesto, es quien hace la llamada. De esta forma `ClientRPC`, lo ejecuta el **cliente** y lo llama el **server**

![[Pasted image 20250624194510.png]]

Por defecto `ClientRPC` se ejecuta en todos los clientes

Sin embargo, un cliente puede mandar un mensaje a través del servidor a un(os) cliente(s) concreto(s) mediante las `ClientRpcParams`

![[Pasted image 20250624194526.png]]

El método debe estar etiquetado con `[ServerRpc]` / `[ClientRpc]` y el nombre debe acabar también en Metodo`ServerRpc` o Metodo`ClientRpc` para que sean válidos (respetando las mayús)

> [!important] El struct que se muestra en el código lo creamos un poco más adelante

_PlayerController.cs_
```cs 
private void OnCollisionEnter2D(Collision2D collision)
{
    print("Player collision with " + collision.transform.name);
    if (!collision.gameObject.CompareTag("Player")) return;
    print("Is player");
    if (!IsOwner) return;

    //Head-Collision
    if (collision.gameObject.TryGetComponent(out PlayerLength playerLength) {
        var player1 = new PlayerData()
        {
            Id = OwnerClientId,
            Length = _playerLength.length.Value
        };
        var player2 = new PlayerData()
        {
            Id = playerLength.OwnerClientId,
            Length = playerLength.length.Value
        };
        DetermineCollisionWinnerServerRpc(player1, player2);
    }
}
``` 

La info que puedes transmitir por este tipo de métodos tiene que ser una de las siguientes: primitivas de C# o Unity y datos serializados que implementen la interfaz `INetworkSerializable`.

Es decir, por defecto:

* primitivas C#: bool, char, sbyte, byte, short, ushort, int, uint, long, ulong, float, double y string
* primitivas Unity: Color, Color32, Vector2, Vector3, Vector4, Quaternion, Ray, Ray2D
* Enums, Arrays de tipos primitivos

Ampliable con `INetworkSerializable`

![[Pasted image 20250624194732.png]]



Ejemplo de implementación de struct con INetworkSerializable 

Pero vamos a hacer uno propio

![[Pasted image 20250624200418.png]]

_PlayerController.cs_
```cs 
struct PlayerData : INetworkSerializable
{
    public ulong Id;
    public ushort Length;

    public void NetworkSerialize<T>(BufferSerializer<T> serializer) where T : IReaderWriter
    {
        serializer.SerializeValue(ref Id);
        serializer.SerializeValue(ref Length);
    }
}
``` 

Métodos para victoria y derrota

_PlayerController.cs_
```cs 
[ClientRpc]
private void AtePlayerClientRpc(ClientRpcParams cParams = default)
{
    if (!IsOwner) return;
    print("You ate a player");
}
[ClientRpc]
private void GameOverClientRpc(ClientRpcParams cParams = default)
{
    if (!IsOwner) return;
    print("You lose!");
    NetworkManager.Singleton.Shutdown();
}
``` 

Los métodos anteriores serán llamados por este. Este a su vez es llamado por `DetermineCollisionWinnerServerRpc` (definición justo abajo)

Utilizamos el parámetro `Send` porque queremos que el servidor envíe el mensaje a **este cliente en concreto**

_PlayerController.cs_
```cs 
[ServerRpc]
private void WinnerInformationServerRpc(ulong winner, ulong loser)
{
    _targetClient[0] = winner;
    _cParams.Send.TargetClientIds = _targetClient;
    AtePlayerClientRpc(_cParams);

    _targetClient[0] = loser;
    _cParams.Send.TargetClientIds = _targetClient;
    GameOverClientRpc(_cParams);
}
``` 

El curso de llamadas es 

1. `DetermineCollisionWinnerServerRpc`

2. `WinnerInformationServerRpc`

3. `AtePlayerClientRpc` / `GameOverClientRpc`

_PlayerController.cs_
```cs 
[ServerRpc]
private void DetermineCollisionWinnerServerRpc(PlayerData p1, PlayerData p2)
{
    if (p1.Length > p2.Length)
    {
        WinnerInformationServerRpc(p1.Id, p2.Id);
    }
    else
    {
        WinnerInformationServerRpc(p2.Id, p1.Id);
    }
}
``` 

## Destrucción de la cola cuando pierdes (OnNetworkDespawn)

```cs 
public override void OnNetworkDespawn()
{
    base.OnNetworkSpawn();
    DestroyTails();
}

private void DestroyTails()
{
    while ( _tails.Count > 0 )
    {
        GameObject tail = _tails[0];
        _tails.RemoveAt(0);
        Destroy(tail, 0.1f);
    }
}
``` 

## UI local (cuando pierdes)

Simplemente hace un canvas desactivado que ejectuando un evento en `PlayerController.GameOverClientRcp` se active

## Nota

Hay ciertos bugs que va solucionando pero que no tienen que ver con el multi, así que en bibliografía está el vídeo si fuese necesario

## PlayerController (p3) Convertir el movimiento de Client Authoritative a Server Authoritative

Lo primero será cambiar `ClientNetworkTranform` ya que es `Client Authoritative` por `NetworkTranform`

Y luego pasamos el movimiento al servidor mediante `ServerRpc`, así, sin más. Creo que es gracias al `NetworkTransform`

## Autorización de conexión (Connection Approval)

Debes activar la opción `Connection Approval` y recomendable aumentar un poco el tiempo límite de conexión del cliente (`Client Connection Buffer Timeout`) porque por defecto son unos ridículos 10 segundos

![[Pasted image 20250624221527.png]]

Este código va en un nuevo GO. Yo lo he llamado Connection Handler

```cs 
using Unity.Netcode;
using UnityEngine;

public class ConnectionApprovalHandler : MonoBehaviour
{
    private const int maxPlayers = 10;

    private void Start()
    {
        NetworkManager.Singleton.ConnectionApprovalCallback += ApprovalCheck;
    }

    private void ApprovalCheck(NetworkManager.ConnectionApprovalRequest request, 
        NetworkManager.ConnectionApprovalResponse response)
    {
        // Obligatorio: por defecto está aceptado, luego veremos si no
        response.Approved = true;

        // Obligatorio: Sirve para el jugador y demás NetworkObjects puedan hacer Spawn
        // lo sé, no tiene mucho sentido
        response.CreatePlayerObject = true;
        response.PlayerPrefabHash = null;

        // Opcional: limitamos a x número de clientes
        if (NetworkManager.Singleton.ConnectedClients.Count >= maxPlayers)
        { 
            response.Approved = false;
            response.Reason = "Cap limit reached :(";
        }

        // Obligatorio: 
        response.Pending = false;
    }
}
``` 

