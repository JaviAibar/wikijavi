> [!important] Actualizado a Abril de 2023

Para la versión (todavía más) antigua, [click aquí](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1FPUIM5YYDnkeYoaeVB0HD5dAy3uUpRe5/edit)

> [!note] Ten en cuenta que en una versión más antigua era lo siguiente. Estos conceptos pueden estar todavía en vigor
> Todo aquel GameObject que quisieramos que el servidor conozca, debía tener un NetworkIdentity
> 
>NetworkBehaviour añadía a MonoBehaviour las cualidades de red como la variable isLocalPlayer
> 
> isLocalPlayer aparentemente venía dado por el NetworkIdentity y servía para discriminar tu 
> instancia de jugador de la del resto de jugadores

# Cosas muy comunes

## Encontrar a un player

> [!warning] Solo servidor
```cs 
NetworkManager.Singleton.ConnectedClients[clientId].PlayerObject;
``` 

> [!warning] Solo servidor
> Si quieres obtener el tuyo (Owner)
```cs 
NetworkManager.Singleton.ConnectedClients[NetworkManager.Singleton.LocalClientId].PlayerObject;
``` 

> [!important] Apto para ambos
```cs 
NetworkManager.LocalClient.PlayerObject 
NetworkManager.Singleton.LocalClient.PlayerObject
NetworkManager.Singleton.SpawnManager.GetLocalPlayerObject()
``` 

## Encontrar a un NetworkObject spawneado

```cs 
NetworkManager.Singleton.SpawnManager.SpawnedObjects[zombie.NetworkObjectId]
``` 

## Inicialización de un NetworkObject (NetworkBehaviour NetworkPlayer, Player, Spawn)

Hay que fijarse siempre en qué variables deben setearse para que corresponda con el estado real del resto de jugadores. Esto es, si tienes un `NetworkVariable` con el color. ==Debes== aplicarselo al `SpriteRenderer / Image`. Por poner un ejemplo

```cs 
if (!IsOwner)
{
    // At initialization, if not Owner, It's because it's rest of players
    // therefore simply set their colour
    _timeIndicator.color = _color.Value;
    return;
}
``` 

> [!warning] Atención
> Suscribirse a los cambios de la NetworkVariable ==lo tienen que hacer todos==

# Tengo un problema

Recopilación de las soluciones a los problemas que me he ido encontrando

## NetworkConfig mismatch. The configuration between the server and client does not match.

Creo que es un bug de ParrelSync, reinicia los dos editores y debería ir todo bien. Sino, tengo la sospecha de que podría tener que ver con el instanceID de los NetworkManager (se puede ver con el inspector en modo debug): En plan que deben tener el mismo valor y pone uno distinto

## A Native Collection has not been disposed, resulting in a memory leak. (Keywords: lista array)

Si te lo dice en una NetworkList, es probable que la hayas inicializado junto a la declaración. es decir: 

```cs 
private NetworkList<AreaWeaponBooster> TeamAreaWeaponBoosters = new NetworkList<AreaWeaponBooster>();  
``` 

De hecho, parece que el único sitio donde puedes inicializarlo es en el `Awake`


## Al intentar añadir un elemento a la NetworkList me da NullReferenceException

Eso probablemente se deba a que estás creando la NetworkList dentro de un objeto que no es NetworkBehaviour. Es obligatorio que tanto las NetworkVariable como las NetworkList existan en clases NetworkBehaviour.

En su momento encontré que podía hacer la siguiente ñapa, pero no funciona porque no se actualizará en los clientes. Para solucionarlo tienes que ejecutar Initialize() en la recién instanciada lista y pasarle una instancia de NetworkBehaviour por argumento

```cs 
var _monsterList = new NetworkList<MonsterData>();
_monsterList.Initialize(this); // this asumiendo que estás inicializandolo en una clase NetworkBehaviour
``` 

## Mi NetworkList dentro de un objeto se actualiza en el servidor pero no en el cliente

Mismo problema que el anterior: Es obligatorio que toda NetworkVariable y NetworkList estén dentro de un NetworkObject.

## Al emparentar un NetworkObject a un GameObject me da error: InvalidParentException: Invalid parenting, NetworkObject moved under a non-NetworkObject parent

Probablemente lo que pase es que debes quitar el check de `Auto Object Parent Sync` del componente `NetworkObject`

## Cuando hago Spawn de un GameObject con Image no se ve aunque tiene Width y Height en el RectTransform

Es un bug. Seguramente te haya puesto la escala a 0

```cs 
transform.localScale = Vector3.one
``` 


## Mi ClientRpc no llega a todos los clientes

Esto podría ser porque el cliente que no ha recibido el mensaje, todavía no se había unido a la partida. Entonces sí debería llegar, pero no a este cliente que estaba ausente

# Definiciones

## Authoritative

es quien tiene la última palabra, el que manda en un sistema

## Server authoritative

> [!note] Por defecto en Unity

Esto quiere decir que es el server el que toma todas la decisiones, la parte negativa es que siempre habrá que esperar a la respuesta del servidor para todo

## Client authoritative

El cliente más o menos decide lo que hacer y manda la info al servidor, y como que deja al servidor la resposabilidad de si quiere o no transmitir la info. La parte negativa de este enfoque es que es más complicada mantener la consistencia y es más peligroso porque es más fácil de hackear

## Latencia

El retraso cuando transmites un mensaje, debido a la distancia que tiene que viajar. Soluciones:

- Interpolación - Hacer más suave gracias a funciones matemáticas en el cliente. Ejemplo: El server va mandando posiciones: En lugar de que parezca que se teletransporta, se hace una transición entre cada punto
    

NGO Está pensado para juegos simples. Si necesitas calculo de físicas o muchos jugadores mira [Netcode for Entities](https://docs.unity3d.com/Packages/com.unity.netcode@1.0/manual/index.html) para lo cual necesitará la movida del [DOTS](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1uDVEYrCG3dbjdGg1osQnOxmQvkogqXDd/edit) #CambiarURL 

> [!important] Para ver un proyecto de ejemplo, puedes visitar la subpágina
> [Snake Multiplayer](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/1y8MiT_-u_7ci-KcuafdPdjbmkzpIfraw/edit) #CambiarURL 

> [!important] Para ver la instalación del entorno multiplayer incluído los requisitos y el ParrelSync, puedes visitar la subpágina de
> 
> [Instalación entorno multiplayer](https://sites.google.com/d/13BAZX83ZVzuHzEhdp8djpzp8Y_hPuGTi/p/153kYb8KuBZ4g0ItCOdFo3EmnGtFmJ5YH/edit) #CambiarURL 

# Elementos imprescindibles / muy importantes:

NetworkManager será el corazón del multiplayer. El que crea el servidor, el que une jugadores a la partida y maneja el transport. Más detalles en el [proyecto de ejemplo #NetworkManager](https://sites.google.com/view/wikijavi/unity/avanzado/networking-nuevo/ejemplo-multiplayer-snake#h.jpi0cu337f8w)

### NetworkObject / NetworkBehaviour

Permite que los elementos hagan Spawn. Más detalles en el [proyecto de ejemplo #NetworkObject](https://sites.google.com/view/wikijavi/unity/avanzado/networking-nuevo/ejemplo-multiplayer-snake#h.vz5gxr38hv8n) #CambiarURL 

### NetworkTransform

Permite sincronizar el movimiento del personaje entre todos los clientes simplemente asignandose en el servidor. Más detalles en el [proyecto de ejemplo #NetworkTransform](https://sites.google.com/view/wikijavi/unity/avanzado/networking-nuevo/ejemplo-multiplayer-snake#h.6h3vi58mj23k) #CambiarURL 

### NetworkAnimator

Sincroniza las animaciones por todos los clientes. Más info [en el proyecto de ejemplo #NetworkAnimator](https://sites.google.com/view/wikijavi/unity/avanzado/networking-nuevo/ejemplo-multiplayer-snake#h.ssb6wt1lvo98) #CambiarURL 

### NetworkObjectPool

Por alguna razón este no viene por defecto pero lo puedes conseguir [aquí](https://docs-multiplayer.unity3d.com/netcode/current/advanced-topics/object-pooling/index.html). Nos permite gestionar `NetworkObjects` de forma eficiente.

# Parrel Sync

Para crear instancias, abrimos el Clones Manager

![[Pasted image 20250624182825.png]]

y click

Sincroniza los cambios y va de lujo, pero hazlo pronto porque tarda mucho

![[Pasted image 20250624182836.png]]

Así se verán las instancias desde el menu `Clones Manager`

![[Pasted image 20250624182850.png]]

En este punto, al ejecutar el proyecto, la chica del vídeo le empezaron a salir errores del `Burst Compiler`, no sé si por el `Parrel`, pero dice que para resolverlo, solo hay que reiniciar Unity

# Orden de ejecución de los eventos en NetworkBehaviour

Lo comentado en el comentario del código, en la parte de `OnNetworkSpawn` es por esto

![[Pasted image 20250624183711.png]]

# Mentalidad multijugador

La mentalidad a la hora de desarrollar un juego multijugador es la siguiente:

Todo codigo se está ejecutando en tu mismo ordenador de forma local, pero las diferentes instancias reciben información diferente (analicemos la imagen)

Este supuesto está desde el punto de vista de Client1: Para client 1, el script que ha spawneado al entrar en el servidor (referenciado como "client1" bajo el engranaje) tendrá IsOwner = true, mientras que los de client2 y server serán false.

Por otra parte tenemos que IsServer será solo true, en aquel dispositivo que sea server. Easy

![[Pasted image 20250624183749.png]]

# Objetos transmitibles por métodos Rpc

La info que puedes transmitir por este tipo de métodos tiene que ser una de las siguientes: primitivas de C# o Unity y datos serializados que implementen la interfaz `INetworkSerializable`.

Es decir, por defecto:

primitivas C#: bool, char, sbyte, byte, short, ushort, int, uint, long, ulong, float, double y string

primitivas Unity: Color, Color32, Vector2, Vector3, Vector4, Quaternion, Ray, Ray2D

Enums, Arrays de tipos primitivos

Ampliable con `INetworkSerializable`

Sin embargo hay una excepción y es que puedes pasar la referencia a un `NetworkObject` y a un `NetworkBehaviour` con `NetworkObjectReference` y `NetworkBehaviourReference`. También sirve para `NetworkVariable`. [Info](https://docs-multiplayer.unity3d.com/netcode/current/basics/networkobject/)

Ejemplo de implementación de `struct` con `INetworkSerializable` 

Pero vamos a hacer uno propio

![[Pasted image 20250624184123.png]]

*PlayerController.cs*
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

# Metodos RPC vs NetworkVariable

Elegir el incorrecto puede llevar a bugs o a un uso excesivo del ancho de banda

Usa RPC cuando sea info concreta del momento.

Usa NetworkVariable para estados que perduran en el tiempo

Como rule of thumb deberías preguntarte si un jugador que se conecta a mitad partida, tendría que saber cierta info concreta, en ese caso, mejor NetworkVariable, en caso contrario, RPC

Relación entre llamadas y NetworkVariable, donde se ve que aunque hayan varios cambios, solo se envía el último antes del tick de envío

![[Pasted image 20250624184158.png]]

Relación entre llamadas y métodos RPC, donde se ve que se envía por cada cambio y que si el otro jugador se conecta más tarde, se pierde los primeros eventos

![[Pasted image 20250624184208.png]]

Además, las NetworkVariables son más óptimas en cuando a ancho de banda ya que se envían solo cuando el valor cambia.

Entonces la pregunta es

## ¿Por qué entonces no usamos siempre NetworkVariable?

### Eventos temporales

A parte de que las RPC son más simples (o eso dice la wiki) puedes necesitar eventos temporales. Solo para ese momento y ya. Como una explosión. Al explotar, el explosivo dejará de existir (también para los nuevos jugadores). Sin embargo, los efectos de la explosión podrían necesitar estar en NetworkVariables, si han herido a un jugador, si han creado algún efecto en las paredes y demás

### Sincronización de varias NetVar / Eventos instantáneos

Como los valores de las NetworkVariable se actualizan cuando pueden, podría ocurrir que una variable se actualizara a tiempo y otra no, cuando necesites que lleguen a tiempo, se debe usar RPC

## Ejemplos de uso

### Para el input, mejor RPC

Porque como NetVar actualiza solo el último valor, se vería laggeado. Lo que queremos es acribillar el servidor con nuestras input

### Flechas (en BossRoom)

Como se usan GameObject independientes para las flechas y su movimiento no es rápido, decidieron replicar el movimiento con un NetworkTransform

### Estado rompible

(Asumiendo que es un barril) En este caso, el equipo podría haber usado un método RPC y aplicar el efecto visual correspondiente, pero se aplicó la regla de que, "si el jugador entra a mitad, lo que debería ver es el barril roto". Por lo que se puso un NetworkVariable que, al cambiar, se viera el efecto de rotura.

Aquí hay otra peculiaridad y es que el evento te devuelve el estado anterior y el actual, entonces podemos comprobar si antes ya estaba roto. Si no estaba roto y ahora lo está -> efecto visual de romperse. Si **ya estaba** roto y está roto, no hacemos nada. Si estaba roto y ahora no lo está -> efecto de repararse

# Publicar en los servicios de Unity y configurar Match making

[Easy Game Server Hosting and Matchmaking with Unity Tutorial](https://youtu.be/FjOZrSPL_-Y)

# IMPORTANTE Entender mejor la arquitectura multijugador

Para entender mejor esta forma de pensar, me parece interesante el caso de [esta persona en el foro de Unity](https://forum.unity.com/threads/alternatives-to-sending-an-action-reference-type-as-serverrpc-parameter.1369092/)

Está intentando reproducir el [patrón Command](https://learn.unity.com/tutorial/command-pattern) aplicado a multijugador Server authoritative. Su problema radica en que como los métodos `Rpc` no pueden manejar tipos complejos, no puede pasar la `Callback`.

![[Pasted image 20250624184320.png]]

Aquí en el `Update` (ejecutado por el servidor) intenta ejecutar la `callback`

![[Pasted image 20250624184347.png]]

## Solución

La `callback` es una función (peticion) que está creada desde el cliente y pensada para que la ejecute el cliente. Por lo que, pensado desde el punto de vista multijugador, no tiene sentido mandarla al servidor, porque la tiene que ejecutar el cliente de todas formas. Por lo que la solución es crear otro método `ClientRpc`

![[Pasted image 20250624184558.png]]

```cs 
public class UnitMovement : NetworkBehaviour
{
    private Vector3 _destination;
    private Action _onMovementComplete;

    private void Update()
    {
        // Only run this on Server as I am using default server authoritative NetworkTransform
        if (!IsServer)
            return;

        // Update position each frame while calculating distance from destination...

        // Destination reached... call the Action so our Unit knows to start the next one.
        EndMovementClientRpc(new ClientRpcParams { Send = new ClientRpcSendParams { TargetClientIds = new ulong[] { OwnerClientId } } });
    }

    public void StartMovement(Vector3 destination, Action onMovementComplete)
    {
        _onMovementComplete = onMovementComplete;
        StartMovementServerRpc(destination);
    }

    [ServerRpc]
    public void StartMovementServerRpc(Vector3 destination)
    {
        _destination = destination;
    }

    [ClientRpc]
    private void EndMovementClientRpc(ClientRpcParams clientRpcParams)
    {
        _onMovementComplete();
    }
}
``` 

Ahora en `Update` (que lo ejecuta el servidor) pide al cliente (un cliente concreto gracias al `ClientRpcParams`) que ejecute su `callback`

Esa `callback` está asignada por el cliente (`StartMovement` que es local)

![[Pasted image 20250624184628.png]]

## Premisos de ejecución de un ServerRpc

Por defecto, estos métodos solo los puede llamar el `Owner`, pero se le puede poner entre paréntesis de esta forma `[ServerRpc(RequireOwnership = false)]` (no es nuestro caso)

En tal caso, si necesitas saber quién ha llamado a esa función, se puede poner como parámetro `ServerRcpParams params = default` y después tomarlo con `params.Receive.SenderClientId`

> [!warning] Ejemplo, no es nuestro caso
> ![[Pasted image 20250624184704.png]]

# Resumen

Es obligatorio tener un NetworkManager

Todo objeto spawneable por el servidor (incluídos player) deberán contener un NetworkObject y estar en una lista de Network Prefabs

Existen dos aproximaciones a la ejecución de métodos (de los que se notifica cliente-servidor) a parte de local: client authoritative (el cliente manda, el servidor replica) y server authoritative (el cliente pide y el servidor provee)

Puedes filtrar quién está ejecutando o no un método (dentro de un NetworkBehaviour) mediante IsClient IsServer o IsOwner.

(Creo que) Tenemos dos formas de hacerlo: Ejemplo lo de calcular la comida

**Server Authoritative**: Desde el script de fruta, con un OnTrigger, filtras que sea el servidor y mediante el collider tomas al jugador y sumas 1. Explicación: es el servidor quien ha hecho la acción y es el jugador el que recibe el efecto

**Client Authoritative**: En el jugador pones el OnTrigger, filtras por IsOwner y te sumas 1. Los demás clientes se actualizan gracias a la suscripción al evento

Si un enfoque como el que he presentado para Client Authoritative, lo queremos convertir a Server Authoritative, como está filtrado por Owner, tendremos que hacer un Rpc (aquí he tenido problemas por no saber hacer Despawn a Food)

Las NetworkCosas se actualizan automáticamente entre todas las instancias

ANTIGUO HELPER

Para crear los botones, la capacidad de conectarse (UI) y el movimiento dependiendo de cliente o servidor, creamos un GameObject con el siguiente código:

```cs 
using Unity.Netcode;
using UnityEngine;

    public class HelloWorldManager : MonoBehaviour
    {
        void OnGUI()
        {
            GUILayout.BeginArea(new Rect(10, 10, 300, 300));
            if (!NetworkManager.Singleton.IsClient && !NetworkManager.Singleton.IsServer)
            {
                StartButtons();
            }
            else
            {
                StatusLabels();

                SubmitNewPosition();
            }

            GUILayout.EndArea();
        }

        static void StartButtons()
        {
            if (GUILayout.Button("Host")) NetworkManager.Singleton.StartHost();
            if (GUILayout.Button("Client")) NetworkManager.Singleton.StartClient();
            if (GUILayout.Button("Server")) NetworkManager.Singleton.StartServer();
        }

        static void StatusLabels()
        {
            var mode = NetworkManager.Singleton.IsHost ?
                "Host" : NetworkManager.Singleton.IsServer ? "Server" : "Client";

            GUILayout.Label("Transport: " +
                NetworkManager.Singleton.NetworkConfig.NetworkTransport.GetType().Name);
            GUILayout.Label("Mode: " + mode);
        }

        static void SubmitNewPosition()
        {
            if (GUILayout.Button(NetworkManager.Singleton.IsServer ? "Move" : "Request Position Change"))
            {
                if (NetworkManager.Singleton.IsServer && !NetworkManager.Singleton.IsClient)
                {
                    foreach (ulong uid in NetworkManager.Singleton.ConnectedClientsIds)
                        NetworkManager.Singleton.SpawnManager.GetPlayerNetworkObject(uid).GetComponent<PlayerMultiplayer>().Move();
                }
                else
                {
                    var playerObject = NetworkManager.Singleton.SpawnManager.GetLocalPlayerObject();
                    var player = playerObject.GetComponent<PlayerMultiplayer>();
                    player.Move();
                }
            }
        }
    }
    ``` 

# ¿Cómo funciona?

Los cambios que deban ser realizados en el cliente (cambiar de color, cambiar un string, recibir un golpe y reducir vida), deben pasar necesariamente por el servidor. Para ello, el cliente hará una llamada a un método ServerRcp, que, una vez completado, deberá llamar a su vez a un método ClientRcp para que dicho cambio se replique en todos los demás clientes.

```cs 
[ServerRpc]
void SubmitPositionRequestServerRpc()
{
    Position.Value = GetRandomPositionOnPlane();
    PositionChangedClientRpc(Position.Value);
}

[ClientRpc]
void PositionChangedClientRpc(Vector3 pos)
{
    Position.Value = pos;
    transform.position = Position.Value;
}
``` 

De esta forma, podemos eliminar el Update que sale en el ejemplo de arriba

En el código de OnNetworkSpawn aparece IsOwner. Este IsOwner identifica si eres el jugador que acaba de entrar en la partida. Cada instancia del juego (la que ejecutas en tu ordenador, por ejemplo) contendrá una copia de todos los player que están jugando (habrá p.e. 3 instancias de player, tú solo controlas a uno, pero el resto está también a tu lado ejecutando su código correspondiente. Cuando entre alguien nuevo que no eres tú, ese IsOwner será true para él pero false para tí

Para poder aplicar los cambios de los nuevos jugadores a los viejos, habrá que añadir un else a if (IsOwner) donde se aplique dicho cambio mediante una peti al servidor

```cs 
if (IsOwner)
{
    Move();
} 
else 
{
  SubmitPositionRequestServerRpc();
}
``` 

Las NetworkList tienen que ser inicializadas antes de iniciar el Host o los clientes (es decir, antes de crear la partida o establecer la conexión)

# Importante! A tener en cuenta

Si permitimos que entren una vez haya empezado la partida, deberemos de inicializar todos los datos que sean locales: en el ejemplo del Snake, qué longitud tienen el resto de jugadores. De lo contrario, al empezar todos parecerán ser de longitud 0

Los métodos Rpc son `TCP` por defecto, si quieres más agilidad pero menos fiabilidad de que los paquetes lleguen, debes poner en el atributo del método lo siguiente 

```cs 
[ServerRpc(Delivery = RpcDelivery.Unreliable)]
``` 

Esto creo que está desactualizado, pero por si acaso. 

Un ejemplo de `INetworkSerializable` con el nombre de jugador, ya que un String no se puede (o podía) Serializar y para poder ponerle un par de cosillas extra

```cs 
/// <summary>
    /// NetworkBehaviour containing only one NetworkVariableString which represents this object's name.
    /// </summary>
    public class NetworkNameState : NetworkBehaviour
    {
        [HideInInspector]
        public NetworkVariable<FixedPlayerName> Name = new NetworkVariable<FixedPlayerName>();
    }

    /// <summary>
    /// Wrapping FixedString so that if we want to change player name max size in the future, we only do it once here
    /// </summary>
    public struct FixedPlayerName : INetworkSerializable
    {
        ForceNetworkSerializeByMemcpy<FixedString32Bytes> m_Name; // using ForceNetworkSerializeByMemcpy to force compatibility between FixedString and NetworkSerializable
        public void NetworkSerialize<T>(BufferSerializer<T> serializer) where T : IReaderWriter
        {
            serializer.SerializeValue(ref m_Name);
        }

        public override string ToString()
        {
            return m_Name.Value.ToString();
        }

        public static implicit operator string(FixedPlayerName s) => s.ToString();
        public static implicit operator FixedPlayerName(string s) => new FixedPlayerName() { m_Name = new FixedString32Bytes(s) };
    }
    ``` 

# Networking para Steam

## Instalación

Utilizar la ventana Package Manager para instalar el paquete de Facepunch.Steamworks : https://github.com/Unity-Technologies/multiplayer-community-contributions.git?path=/Transports/com.community.netcode.transport.facepunch

## Configuración

Una vez instalado el paquete crea el Network Manager en la escena y selecciona FacepunchTransport para crear el nuevo Transport. (Debes seleccionar "None" en el Network Transport si lo estableciste anteriormente)

En el componente Facepunch Transport escribe el ID de tu juego en Steam una vez lo hayas subido a la plataforma. Para hacer pruebas puedes usar el id 480.

*Se necesita el paquete Steamworks.NET para gestionar el resto de funciones de Steam. URL: https://github.com/rlabrecque/Steamworks.NET.git?path=/com.rlabrecque.steamworks.net

## Bibliografía

[https://docs-multiplayer.unity3d.com/netcode/current/migration/install/index.html](https://docs-multiplayer.unity3d.com/netcode/current/migration/install/index.html)

[https://docs-multiplayer.unity3d.com/netcode/current/tutorials/helloworld/helloworldintro](https://docs-multiplayer.unity3d.com/netcode/current/tutorials/helloworld/helloworldintro)

[https://docs-multiplayer.unity3d.com/netcode/current/tutorials/helloworld/helloworldtwo](https://docs-multiplayer.unity3d.com/netcode/current/tutorials/helloworld/helloworldtwo)

(Actualización abril 2023) [https://www.youtube.com/watch?v=swIM2z6Foxk&ab_channel=samyam](https://www.youtube.com/watch?v=swIM2z6Foxk&ab_channel=samyam) 

[https://forum.unity.com/threads/alternatives-to-sending-an-action-reference-type-as-serverrpc-parameter.1369092/](https://forum.unity.com/threads/alternatives-to-sending-an-action-reference-type-as-serverrpc-parameter.1369092/) 

Metodos RPC vs NetworkVariable [https://docs-multiplayer.unity3d.com/netcode/current/learn/rpcvnetvar/](https://docs-multiplayer.unity3d.com/netcode/current/learn/rpcvnetvar/)  

Ejemplos Metodos RPC vs NetVar [https://docs-multiplayer.unity3d.com/netcode/current/learn/rpcnetvarexamples/](https://docs-multiplayer.unity3d.com/netcode/current/learn/rpcnetvarexamples/) 

Inicialización junto a declaración de NetworkLists https://docs-multiplayer.unity3d.com/netcode/current/basics/networkvariable/index.html#synchronizing-complex-types-example

