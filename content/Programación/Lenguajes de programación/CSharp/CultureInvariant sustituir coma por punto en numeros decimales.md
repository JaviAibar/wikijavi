Keywords: float doble double internationalization internacionalizacion localization localisation localizacion i13n l10n

Si lo queremos solo para unas pocas conversiones, podemos hacer lo siguiente

```cs
valorFloat.ToString(System.Globalization.CultureInfo.InvariantCulture).
```

Si lo queremos para toda la ejecución, creo que es así, pero no lo he probado

```cs
Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("en-GB");
```