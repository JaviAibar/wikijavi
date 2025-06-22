# Selección de idioma

Unity nos da una herramienta selector de idioma con un desplegable flotante automáticamente, pero que luego no está disponible en el juego por razones obvias. Por una parte puedes querer deshabilitarlo para cuando tengas tu selector de idioma. Para ello:

Hay que ir a Edit > Preferences > Localization y desmarcar Locale Game View Menu

![[Pasted image 20250612191925.png]]

Añade Unity.ResourceManager y Unity.Localization a las dependencias del AssemblyDefinition

![[Pasted image 20250612191940.png]]


Una vez hecho eso, tendremos que hacer nuestro propio selector, ellos nos dan uno en el que se usa el `Dropdown` legacy, pero yo lo he adaptado para el del `Text Mesh Pro`. El código es el siguiente:

```cs 
using System.Collections;  
using System.Collections.Generic;  
using UnityEngine;  
using UnityEngine.Localization.Settings;  
using TMPro;  

public class LocaleSelector : MonoBehaviour  {
public TMP_Dropdown dropdown;

private void Awake()
{
    dropdown = GetComponent<TMP_Dropdown>();
}

IEnumerator Start()
{
    // Wait for the localization system to initialize
    yield return LocalizationSettings.InitializationOperation;
      // Generate list of available Locales
    var options = new List<TMP_Dropdown.OptionData>();
    int selected = 0;
    for (int i = 0; i < LocalizationSettings.AvailableLocales.Locales.Count; ++i)
    {
        var locale = LocalizationSettings.AvailableLocales.Locales[i];
        if (LocalizationSettings.SelectedLocale == locale)
            selected = i;
        options.Add(new TMP_Dropdown.OptionData(locale.name.Split(' ')[0]));
    }
    dropdown.options = options;
      dropdown.value = selected;
    dropdown.onValueChanged.AddListener(LocaleSelected);
}

  static void LocaleSelected(int index)
  {
    LocalizationSettings.SelectedLocale = LocalizationSettings.AvailableLocales.Locales[index];
}  }
``` 

Básicamente la magia sucede en el método de abajo, donde se asigna el locale seleccionado dentro de la lista `LocalizationSettings.AvailableLocales.Locales` al locale activo `LocalizationSettings.SelectedLocale.`

Puede que te de un error de que la operación `Async` no sé qué y que no está en el ensamblado y blabla. Lo más seguro es que tengas un `AssemblyDefinition` y no hayas añadido `Unity.ResourceManager` como dependencia.