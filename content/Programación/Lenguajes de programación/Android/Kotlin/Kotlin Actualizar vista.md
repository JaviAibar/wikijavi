La vista se actualiza de forma "inteligente", detecta que la colección que se está mostrando tiene cambios y automáticamente se actualiza. Pero para que esto suceda `debe ser una colección observable`

# Objetos y colecciones observables

`MutableStateList` inicializado como `mutableStateListOf<T>()`

- [`ObservableBoolean`](https://developer.android.com/reference/android/databinding/ObservableBoolean?hl=es-419)
- [`ObservableByte`](https://developer.android.com/reference/android/databinding/ObservableByte?hl=es-419)
- [`ObservableChar`](https://developer.android.com/reference/android/databinding/ObservableChar?hl=es-419)
- [`ObservableShort`](https://developer.android.com/reference/android/databinding/ObservableShort?hl=es-419)
- [`ObservableInt`](https://developer.android.com/reference/android/databinding/ObservableInt?hl=es-419)
- [`ObservableLong`](https://developer.android.com/reference/android/databinding/ObservableLong?hl=es-419)
- [`ObservableFloat`](https://developer.android.com/reference/android/databinding/ObservableFloat?hl=es-419)
- [`ObservableDouble`](https://developer.android.com/reference/android/databinding/ObservableDouble?hl=es-419)
- [`ObservableParcelable`](https://developer.android.com/reference/android/databinding/ObservableParcelable?hl=es-419)


```kotlin 
ObservableArrayMap<String, Any>().apply {
    put("firstName", "Google")
    put("lastName", "Inc.")
    put("age", 17)
}
``` 


# Para ciclos de vida

 [`StateFlow`](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow?hl=es-419) y [`LiveData`](https://developer.android.com/topic/libraries/architecture/livedata?hl=es-419)


# Biblio

https://developer.android.com/topic/libraries/data-binding/observability?hl=es-419
