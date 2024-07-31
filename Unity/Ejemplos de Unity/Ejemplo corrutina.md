
```csharp
StartCoroutine(playEngineSound()); 
```

```csharp
 
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

