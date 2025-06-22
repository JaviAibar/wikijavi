```cs 
var button = Instantiate(levelButtonPrefab, levelsGrid.transform);

button.name = LocalizationSettings.StringDatabase.GetLocalizedString("Menus", "Level") + " " + (i + 1).ToString("D3");

button.GetComponentInChildren<Text>().text = (i + 1).ToString("D3");

ScriptableObjectLevel level = (ScriptableObjectLevel)Resources.Load(LocalizationSettings.SelectedLocale.Formatter + "/Levels/Level " + (i + 1).ToString("D3"));

Image checkedImage = button.transform.GetChild(1).GetComponent<Image>();

int solved = PlayerPrefs.GetInt((i + 1).ToString("D3"), 0);

if (solved == 0) {
  checkedImage.gameObject.SetActive(false);
} else {
  checkedImage.sprite = checkSprites[solved - 1];
}

button.GetComponent<Button>().onClick.AddListener(
  delegate {
      LevelLoader.currentLevel = (ScriptableObjectLevel)Resources.Load(LocalizationSettings.SelectedLocale.Formatter+"/Levels/Level " + button.name.Split(" ")[1]);
    SceneManager.LoadScene("Level");
});
``` 