# Modelo

![](https://lh7-rt.googleusercontent.com/u/0/docs/AHkbwyK1H8JjMvUJM0pEHMW4eFqvEsAHF3miOMFcBbMeIprNjb-DY21b5_UR9ZVzrFeGA0woJEirUty5YG3bf6BPdkhp9kKYTuLXJThSAJTlxJnW0OQojPoCJdhzkgqbt4lbOji-BiCPv1FnoXH8IkZj_8JgZmSFcW0-1yNTGOpNWtu4-z7t7mYt2dXk9f1623Gi9KHVCtJ2QMh7EQnVxuGH5R8YXFZZwIsRTBpORKZqbIMC3feQ0xp_37CS_JZ6RtqixZgSA6Clf2slRw8xgquUR6CNhccws8SJ977_aQwyWdGCbT0WvrBIxyW0yYh6KBSgbFW0SF4oKGh5uJUHMWl2MokoZaogxOzmekXmGAs4_DCLeBsi5qcpSQD_EMljUqLLNDVTkLsTjUAX--JU_GJkBl2giyRabXdbUWaiuu-iyRoJY51P9Eb1ke247uztb-ZB8jfkheckNk7jY6Dz4c65FuBXhsjHO9BOEZpHb_GLgi6kKX5uoA7fDHpqybDZEsf8XbFOUMXl2pK9UfGLE39O3he12sp14jSkRAc1YoooEV65iHN30tVK8wDWQMVPv4TMUHGiIv9KrJ_gYmJMauhIkQYDUR0U0elUx5dErSh4pGhdCuYjavXERQlqBmXK8N6_MKb9TjVMeYO0alGR1gdIyBKAIQwhgcvgqNmoZbP9Ejlot3EvO6BGjsuFueJeO6BqkBF4mr3Avly9rxZqDdbjXid1nc9bvkD5rbLMTPe0MNWdyarVW-NnF5aTIJ0DYcgr9NA8AhA6AQJnj35Ed4lenwWhF1_CZPhBw4_Qbenr54oOOX92i2dKSdk-kmbw62T3xifAHWqSDrjhOKmZ9XvlXGSEIyY4eOtWy4mH11uFaudL9yS8yMbTAX-9tfEQ8AIPvuGUSpc8L5mdK8GcyKwQPfVR6JsTs751)


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

