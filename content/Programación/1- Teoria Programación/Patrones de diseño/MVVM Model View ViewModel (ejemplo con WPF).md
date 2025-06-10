Hay que crear 3 carpetas: Model, View y Modelview

Por cada vista que creemos en View, deberemos crear un script en ModelView

![[Pasted image 20250610131326.png]]

Además, se compone de los siguientes elementos para funcionar: `Stores, Services, Commands y Navigation`

Este ejemplo contempla una app de reserva de habitación de hotel

Este ejemplo está más detallado en [[4- Ejemplo MVVM]]

# Model y View

_Modelo_
![[Pasted image 20250610132653.png]]

Nada reseñable del modelo o las vistas. De la vista simplemente resaltar que ha creado una vista principal donde cargará el resto de vistas, pero dudo que sea obligatorio siquiera. Es en la parte del ViewModel donde está el nucleo de esta técnica

# ViewModel

Debemos crear un `ViewModelBase` que implementará `INotifyPropertyChanged` del que heredarán el resto de nuestro clases `ViewModel`. De esta forma, si en el `ViewModel` en cuestión hubiese un cambio, la vista se actualizaría automáticamente

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

Ahora creamos una clase `ViewModel` por cada vista que tengamos (incluída `MainWindow`, que tendrá `MainViewModel`), heredando, como decíamos, de `ViewModelBase`. Un ejemplo:

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

# Bibliografía

[https://youtu.be/fZxZswmC_BY?list=PLA8ZIAm2I03hS41Fy4vFpRw8AdYNBXmNm](https://youtu.be/fZxZswmC_BY?list=PLA8ZIAm2I03hS41Fy4vFpRw8AdYNBXmNm)


# Keywords

Model View ViewModel (ejemplo con WPF)