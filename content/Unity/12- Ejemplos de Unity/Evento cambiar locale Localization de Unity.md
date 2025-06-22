```cs 
private void OnEnable()
    {
        LocalizationSettings.SelectedLocaleChanged += LanguagesChange;
    }

    private void OnDisable()
    {
        LocalizationSettings.SelectedLocaleChanged -= LanguagesChange;
    }

    public void LanguagesChange(UnityEngine.Localization.Locale value)
    {
        print($"Locale seleccionado: {LocalizationSettings.SelectedLocale.Formatter}");
    }
    ``` 
