Está relacionado con la UI

En mi caso fue por usar Sprite.Create() y en rect le pase Rect.zero. Al cambiar por new Rect(0.0f, 0.0f, 1, 1) me funcionó.

Resultado que funcionó:

```cs
Sprite.Create(Texture2D.blackTexture, new Rect(0.0f, 0.0f, 1, 1), Vector2.zero)
```

También es posible que te pase algo de lo que mencionan [aquí](https://forum.unity.com/threads/invalid-aabb-inaabb.997040/)