# Modelo

![[Pasted image 20250610132653.png]]

![[Pasted image 20241024123107.png]]

```cs 
namespace Reservoom.Models
{
    public class Hotel
    {
        private readonly ReservationBook _reservationBook;

        public string Name { get; }

        public Hotel(string name, ReservationBook reservationBook)
        {
            Name = name;
            _reservationBook = reservationBook;
        }
    }
}
``` 

```cs 
namespace Reservoom.Models
{
    public class Reservation
    {
        public RoomID RoomID { get; }
        public DateTime StartTime { get; }
        public DateTime EndTime { get; }

        public TimeSpan Length => EndTime.Subtract(StartTime);

        public Reservation(RoomID roomID, DateTime startTime, DateTime endTime)
        {
            RoomID = roomID;
            StartTime = startTime;
            EndTime = endTime;
        }
    }
}
``` 

```cs 
namespace Reservoom.Models
{
    public class ReservationBook
    {
        private readonly Dictionary<RoomID, IList<Reservation>> _roomsToReservations;

        public ReservationBook()
        {
            _roomsToReservations = new Dictionary<RoomID, List<Reservation>>();
        }
}
``` 

```cs 
namespace Reservoom.Models
{
    public class RoomID
    {
        public int FloorNumber { get; }
        public int RoomNumber { get; }

        public RoomID(int floorNumber, int roomNumber)
        {
            FloorNumber = floorNumber;
            RoomNumber = roomNumber;
        }
        
	    public override bool Equals(object obj)
        {
            return obj is RoomID roomID &&
                FloorNumber == roomID.FloorNumber &&
                RoomNumber == roomID.RoomNumber;
        }
    
	    public override int GetHashCode()
        {
            return HashCode.Combine(FloorNumber, RoomNumber);
        }
    }
}
``` 

_MakeReservationView.xaml_
```xml 
<UserControl
			 
``` 

Para cargar la vista por defecto, la pone dentro del grid en `MainWindows.xaml`

```xml 
<Window
		...
>
	<Grid>
		<views:MakeReservationView />
	</Grid>
</Window>

