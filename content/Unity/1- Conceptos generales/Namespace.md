Es útil para clasificar scripts en grupos y evitar colisiones

Ejemplo entre Unity y Microsoft

Microsoft ha definido una clase llamada `Random`, pero Unity quiere también implementar la suya

No hay problema, porque la de Microsoft está en `System.Random` y la de Unity en `UnityEngine.Random` de tal forma que son unívocas

puedes hacer un using de UnityEngine y si necesitas en un momento determinado la de Microsoft haces `System.Random rand = new System.Random()` y a funcionar

# Truco 1

Unity permite poner un namespace predefinido en opciones

![[Pasted image 20250612205133.png]]

# Truco 2

Visual Studio puede refactorizar una clase para envolverla en un namespace

![[Pasted image 20250612205142.png]]

