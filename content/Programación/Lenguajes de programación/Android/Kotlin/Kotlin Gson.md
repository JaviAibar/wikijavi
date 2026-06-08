Una librería de gestión de Json de Google

## Context

Necesitas el context de la aplicación, lo obtendrá por la clase

```kotlin 
class StorageHelper(private val context: Context) {
``` 

y le viene de la clase principal

```kotlin 
storage = StorageHelper(this)
``` 

## Serialización

Como no es capaz de serializar objetos automáticamente 

```kotlin 
data class JsonToday(  
    var day: LocalDate,  
    var times: SnapshotStateList<LocalDateTime>  
)  
  
private data class JsonTodayDTO(  
    val date: String,  
    val dateList: List<String>  
)
``` 

```kotlin 
fun guardar(today: JsonToday) {  
  
    val dto = JsonTodayDTO(  
        date = today.day.toString(),  
        dateList = today.times.map { it.toString() }  
    )  
  
    val json = gson.toJson(dto)  
    context.openFileOutput(fileName, Context.MODE_PRIVATE).use {  
        it.write(json.toByteArray())  
    }  
}
``` 

## Deserializar

```kotlin 
fun cargar(): JsonToday {  
    return try {  
        val todayDate = LocalDate.now()  
        val json = context.openFileInput(fileName).bufferedReader().readText()  
        val type = object : TypeToken<JsonTodayDTO>() {}.type  
        val dto = gson.fromJson<JsonTodayDTO>(json, type)  
  
        val loadedDate = LocalDate.parse(dto.date)  
  
        if (loadedDate == todayDate) {  
            // ✔ Fecha coincide → devolvemos tal cual            JsonToday(  
                day = loadedDate,  
                times = dto.dateList.map { LocalDateTime.parse(it) }.toMutableStateList()  
            )  
        } else {  
            JsonToday(  
                day = todayDate,  
                times = SnapshotStateList<LocalDateTime>()  
            )  
        }  
  
    } catch (e: Exception) {  
        // Retornas valor por defecto  
        JsonToday(  
            day = LocalDate.now(),  
            times = SnapshotStateList<LocalDateTime>()  
        )  
    }
``` 