Hay que crear 3 carpetas: Model, View y Modelview

Por cada vista que creemos en View, deberemos crear un script en ModelView

![](https://lh7-rt.googleusercontent.com/u/0/docs/AHkbwyKQSLRsiJlv3AMZRhWgtmx6F-p-g8nInUBqDcVbEBuOltoQ1VpVX-GOAEovyc5gUMJCuHC6WUINUPAsCdA9_Eiv_O2UdzLC8D2ncOaP5eBba4-7xOgwP67NUpFXVkaAjjusngkIOfk6cn6gJz6B2e56fQi-VzM3mRqhg1E4TQ2JJC2eEiY70zCMf9_VK3DOuHx7HvWQg78qWzIQ5HzB7lixxbpwJWxPHKzk103nGRqHGSDO1ZVotMa5bvr8uV7MNcE-JX-M74NdEgPcxIjgMa3LubiouZCpdU0JMAbzDsuFiZNu3ASYqLehDdl7Q7pqTf1XMvS6pz9Ejmu5gO1rcy-w5Im6Crh8y74uqv6-K2ubSXiXmaD4ShqnbmiJ6WRQEtXlbwZOAe4QQFO92MqJBlxFPtVAVoKn8gSKAPbqQ99urfJqzcJlyePOCQ9A1xFHCwFTeGn-J-mJpzmWrMTquE_99m8AqdZV_vq203w_Uo0fA24mpLANBlfDgcceP7A88lt0g57-HRvOZdK_wQvvOnDgTA8YPS35LcEzYRCINkV1HA5VArsjb5ai0DrIN87mmyIr-En09vtMfZBv6hXZ8Ivy8B9CSmlhUh5chugIBi4wT4-5i5abRfTY_8sQ8UyROWQdlTZkSlfkX-Ker_pa2XRjQ_xjoHmXOjoUs5MYC1HZ4eOFsQao7gUcDEE9WMcLatOPFOzQT3Kt1BWorJ4xj8JHLAVBhRoxPTHASTnq5VN98SmlmVPqGR8YyePzmKQEg45nacjrqkPvDqyDQyI7q-yD-KdTxuXfxujRyT0GLAOT6mIoqXMW3h4jyTC-mXV9vHH7Waihqbrm4mpbb9A3w7juWo44j88RpBR1Z4gOOveLa0zspW2hitxmvKFsOH0UzEUkhX3JNokmNigGO-38v8HLgVKwt5nR)

Además, se compone de los siguientes elementos para funcionar: Stores, Services, Commands y Navigation

Este ejemplo contempla una app de reserva de habitación de hotel

Este ejemplo está más detallado en [[4- Ejemplo MVVM]]

# Model y View

_Modelo_
![](https://lh7-rt.googleusercontent.com/u/0/docs/AHkbwyK1H8JjMvUJM0pEHMW4eFqvEsAHF3miOMFcBbMeIprNjb-DY21b5_UR9ZVzrFeGA0woJEirUty5YG3bf6BPdkhp9kKYTuLXJThSAJTlxJnW0OQojPoCJdhzkgqbt4lbOji-BiCPv1FnoXH8IkZj_8JgZmSFcW0-1yNTGOpNWtu4-z7t7mYt2dXk9f1623Gi9KHVCtJ2QMh7EQnVxuGH5R8YXFZZwIsRTBpORKZqbIMC3feQ0xp_37CS_JZ6RtqixZgSA6Clf2slRw8xgquUR6CNhccws8SJ977_aQwyWdGCbT0WvrBIxyW0yYh6KBSgbFW0SF4oKGh5uJUHMWl2MokoZaogxOzmekXmGAs4_DCLeBsi5qcpSQD_EMljUqLLNDVTkLsTjUAX--JU_GJkBl2giyRabXdbUWaiuu-iyRoJY51P9Eb1ke247uztb-ZB8jfkheckNk7jY6Dz4c65FuBXhsjHO9BOEZpHb_GLgi6kKX5uoA7fDHpqybDZEsf8XbFOUMXl2pK9UfGLE39O3he12sp14jSkRAc1YoooEV65iHN30tVK8wDWQMVPv4TMUHGiIv9KrJ_gYmJMauhIkQYDUR0U0elUx5dErSh4pGhdCuYjavXERQlqBmXK8N6_MKb9TjVMeYO0alGR1gdIyBKAIQwhgcvgqNmoZbP9Ejlot3EvO6BGjsuFueJeO6BqkBF4mr3Avly9rxZqDdbjXid1nc9bvkD5rbLMTPe0MNWdyarVW-NnF5aTIJ0DYcgr9NA8AhA6AQJnj35Ed4lenwWhF1_CZPhBw4_Qbenr54oOOX92i2dKSdk-kmbw62T3xifAHWqSDrjhOKmZ9XvlXGSEIyY4eOtWy4mH11uFaudL9yS8yMbTAX-9tfEQ8AIPvuGUSpc8L5mdK8GcyKwQPfVR6JsTs751)

Nada reseñable del modelo o las vistas. De la vista simplemente resaltar que ha creado una vista principal donde cargará el resto de vistas, pero dudo que sea obligatorio siquiera. Es en la parte del ViewModel donde está el nucleo de esta técnica

# ViewModel

Debemos crear un ViewModelBase que implementará INotifyPropertyChanged del que heredarán el resto de nuestro clases ViewModel. De esta forma, si en el ViewModel en cuestión hubiese un cambio, la vista se actualizaría automáticamente

```cs 
public class ViewModelBase : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
``` 

Ahora creamos una clase ViewModel por cada vista que tengamos (incluída MainWindow, que tendrá MainViewModel), heredando, como decíamos, de ViewModelBase. Un ejemplo:

```cs 
public class ReservationListingViewModel : ViewModelBase
{
    private readonly ObservableCollection<ReservationViewModel> _reservations;
    public ICommand MakeReservationCommand { get; }

    public IEnumerable<ReservationViewModel> Reservations => _reservations;
    public ReservationListingViewModel()
    {
        _reservations = new ObservableCollection<ReservationViewModel>();

        // Database loading
        _reservations.Add(
            new ReservationViewModel(
                new Reservation(new RoomID(1, 2), "Persona A")
            ));

        _reservations.Add(
            new ReservationViewModel(
                new Reservation(new RoomID(1, 3), "Persona B")
            ));
        _reservations.Add(
            new ReservationViewModel(
                new Reservation(new RoomID(2, 2), "Persona C")
            ));
    }
}
``` 

Que hace uso de la siguiente clase

```cs 
public class ReservationViewModel : ViewModelBase
{
    // MODEL
    private readonly Reservation _reservation;

    // VIEW
    public string RoomID => _reservation.RoomID?.ToString();

    public string Name => _reservation.Name;
    public ReservationViewModel(Reservation reservation)
    {
        _reservation = reservation;
    }
}
``` 


# Keywords

Model View ViewModel (ejemplo con WPF)