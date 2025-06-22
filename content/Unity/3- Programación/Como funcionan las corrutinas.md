
Hasta donde yo entiendo, la corrutina es una función que tiene la capacidad de crear un hilo diferente al principal (no bloquea el proceso principal) y se inicia con StartCoroutine(MetodoDeCorrutina(algunaVariableOpcional))

Dentro de la corrutina, sin embargo, sí podemos bloquear el hilo para lo que necesitemos, esto se hace con yield return

En resumen: yield return bloquea el hilo; StartCoroutine, no

# Ejemplo 

```cs 
 StartCoroutine(playEngineSound());
 ``` 

```cs 
   IEnumerator playEngineSound()
    {
        // We set start of engines sound
        _audio.clip = startEngineClip;
        _audio.Play();
        // We wait until it's over
        yield return new WaitForSeconds(_audio.clip.length);
        // then, we change the clip to the one that must be looped
        // it corresponds to the sound of the engines continously working
        _audio.clip = loopEngineClip;
        // The AudioSource plays in loop the sound of engines running
        _audio.Play();
    }
    ``` 

# Otro ejemplo

```cs 
public void FuncionNormal() { // Esta función NO se bloqueará en ningún momento
	print("Primer mensaje");
	StartCoroutine(FuncionCorrutina());
	print("Segundo mensaje");
}

public IEnumerator FuncionCorrutina() { // Esta función SÍ se bloquea
	yield return WaitForUserInput();
	print("El usuario pulsó!")
}

public IEnumerator WaitForUserInput() {
        while (!Input.GetKeyDown(KeyCode.Return)) { // Espera hasta que pulsa enter
		print("...");
		yield return null;
	}
}

Lo que sale por consola:
Primer mensaje
...               (Se ha iniciado la corrutina y ya ha enviado un msj)
Segundo mensaje   (El hilo principal se sigue ejecutando)
...
...
...               (Sigue mandando mensajes mientras no se pulse)
...
...
El usuario pulsó! (Al pulsar, la corrutina sigue su curso)
``` 

[CoroutineExample.cs](https://drive.google.com/file/d/1KCFr7r6tqBvQrmq3fTdCWsSwQSkPhg5B/view?usp=share_link)

# Keywords

corutinas coroutine corutine