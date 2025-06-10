Creo que es como PlayerPrefs de Unity. Una diferencia es que no es estático :/

```java
getInt (String key, int defValue); // getBoolean, Float, Long, String, StringSet, All
```

para añadir una variable nueva tenemos que crear un editor

```java
SharedPreferences.Editor editor = nuestroObjDeVariables.edit();
```

Con este objeto ya podremos ejecutar las siguientes métodos:

```java
putInt(String key, int value) // putBoolean, Float, Long, String, StringSet
```

Pero antes de acabar, tienes que guardar los cambios (ya, yo tampoco lo entiendo)

```java
.commit() los guarda y devuelve un bool si lo ha conseguido

.apply() los guarda sin bool

.clear() + . commit() borra todos los valores que tuviese el objeto SharedPreferences, solo quedará los que acabas de meter en el editor
```

# Bibliografía

[https://developer.android.com/reference/android/content/SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences)