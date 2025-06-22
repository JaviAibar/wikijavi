Las calidades se encuentran y se pueden configurar desde `Project Settings > Quality`

![[Pasted image 20250612190714.png]]

Dichas calidades se listan desde el código mediante `QualitySettings.names`, este array se puede meter en un Dropdown y el índice del array corresponde a la calidad correspondiente. Y ese índice se le pasa a `QualitySettings.SetQualityLevel(int calidad)` De tal forma que queda así:

```cs 
private void Start()
{
    string[] qualities = QualitySettings.names;
    foreach (string q in qualities)
        qualityDropdown.options.Add(new TMP_Dropdown.OptionData(q));
    qualityDropdown.value = QualitySettings.GetQualityLevel();
}

private void OnEnable()
{
    qualityDropdown.onValueChanged.AddListener(QualityChanged);
}

private void OnDisable()
{
    qualityDropdown.onValueChanged.RemoveListener(QualityChanged);
}

private void QualityChanged(int value)
{
    QualitySettings.SetQualityLevel(value);
}
``` 

