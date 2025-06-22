
## Modo Unity

```cs 
    public UnityEvent startInteracting;
    public UnityEvent interacting;
    public UnityEvent stopInteracting;


    public void StartInteracting() {
        startInteracting.Invoke();
    }

    public void Interacting() {
        interacting.Invoke();
    }

    public void StopInteracting() {
        stopInteracting.Invoke();
    }
    ``` 

# Modo Action

```cs 
public static event System.Action<ushort> ChangedLengthEvent;
``` 

## Código que genera el evento

```cs 
public static event System.Action<ushort> ChangedLengthEvent;

public void ChangeLength() {
    // Code
    if (ChangedLengthEvent != null)
        ChangedLengthEvent.Invoke(length.Value);
}
``` 

## Código afectado por el evento

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

# Modo evento delegado

Primero debemos crear una clase que gestione los eventos, la llamaremos EventManager.

Esta tendrá un delegado y eventos de su tipo, a los cuales se sindicará todos los métodos que necesitemos

```cs 
#EventManager.cs

public delegate void HealthControl();
public static event HealthControl PlusHealth; 
public static event HealthControl MinusHealth;
public static event HealthControl HealthChanged;
``` 

Éstos serán los métodos que luego ejecutaremos desde fuera y que desencadenarán los eventos (ejecutarán todos los métodos que estén sindicados)

```cs 
#EventManager.cs

public void IncreaseHeart()
{
    if (PlusHealth != null)
        PlusHealth();
}

public void DecreaseHeart()
{
    if (MinusHealth != null)
        MinusHealth();
}
public void HealthValueChanged()
{
    if (HealthChanged != null)
        HealthChanged();
}
``` 

Ahora falta suscribir las acciones correspondientes a esos eventos. Para ello, he creado la clase `UpdateHealth`, que se encargará de mostrar de forma gráfica los cambios en la vida del personaje

```cs 
#UpdateHealth.cs

//Sindicación de los eventos
void OnEnable()
{
    EventManager.HealthChanged += OnHealthChanged;
    EventManager.MinusHealth += ReduceHealth;
    EventManager.PlusHealth += IncreaseHealth;
}

//Desuscripción de los eventos al desactivarse el componente (medida de seguridad)
void OnDisable()
{
    EventManager.HealthChanged -= OnHealthChanged;
    EventManager.MinusHealth -= ReduceHealth;
    EventManager.PlusHealth -= IncreaseHealth;
}
``` 

Y aquí los eventos

```cs 
#UpdateHealth.cs

void ReduceHealth()
{
    lifes[playerManager.Health].sprite = emptyHeart;
}
void IncreaseHealth()
{
    lifes[playerManager.Health -1].sprite = filledHeart;
}

void OnHealthChanged()
{
    for (int i = 0; i < playerManager.Health && i < lifes.Length; i++)
    {
        lifes[i].sprite = filledHeart;
    }
    for (int i = playerManager.Health; i < playerManager.MaxHealth && i < lifes.Length; i++)
    {
        lifes[i].sprite = emptyHeart;
    }
}
``` 

Al clicar al botón de aumentar salud

![[Pasted image 20250612185737.png]]

(lo sé, son cutres, soy programador😂)

Este debe ejecutar `IncreaseHeart()` en `EventManager`

Esquema de lo que ocurre

![[Pasted image 20250612185802.png]]