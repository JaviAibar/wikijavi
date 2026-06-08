# Ejecutar métodos privados de otras clases

Esto nos sirve para debug y testing. Es increíblemente fácil y poderoso

spawner es la instancia de donde queremos ejecutar el método privado

El string es el método privado que queremos ejecutar

El siguiente argumento (BindingFlags) indicamos que queremos ejecutar un método privado (NonPublic) y de instancia (Instance) es decir, que no es estático.

Por último, invocamos el método pasandole por argumento que la función requiera.

```cs 
System.Reflection.MethodInfo method = spawner.GetType().GetMethod("SpawnZombie", BindingFlags.NonPublic | BindingFlags.Instance);
method.Invoke(spawner, new object[] { (byte)windowToSpawn });
``` 

# Acceder a campos privados de otras clases

```cs 
private void ShowZombiesList()
{
    MonsterList[] monsterLists = typeof(MonsterSpawner).GetField("_monstersWindows",
                        BindingFlags.NonPublic |
                        BindingFlags.Instance).GetValue(spawner) as MonsterList[];
    foreach (MonsterList monster in monsterLists)
    {
        Debug.Log(monster);
    }
}
``` 

## También parece existir esta otra forma

```cs 
    // Microsoft.VisualStudio.TestTools.UnitTesting.PrivateType privateTypeMyClass = new Microsoft.VisualStudio.TestTools.UnitTesting.PrivateType(trafficLight.GetType());

  

    //((SpriteRenderer)privateTypeMyClass.("spriteRenderer")).sprite
``` 



# Bibliografía

Method [https://gist.github.com/M1NDOVERFL0W/b56709ebc8a32965c2246448e4e925bd](https://gist.github.com/M1NDOVERFL0W/b56709ebc8a32965c2246448e4e925bd) 

Field [https://stackoverflow.com/a/8442803](https://stackoverflow.com/a/8442803)