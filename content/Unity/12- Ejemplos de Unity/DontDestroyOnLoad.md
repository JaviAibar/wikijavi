```cs 
static GameEngine instance;
private void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }
    ``` 

Añade el archivo singleton.snippet en la carpeta:

```shell
"C:\Program Files\Microsoft Visual Studio\2022\Community\VC#\Snippets\3082\Visual C#\"
``` 

*singleton.snippet*
```xml
<?xml version="1.0" encoding="utf-8"?>
<CodeSnippets xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
	<CodeSnippet Format="1.0.0">
		<Header>
			<Title>sing</Title>
			<Shortcut>sing</Shortcut>
			<Description>Fragmento de código para el patrón Singleton / DontDestroyOnLoad</Description>
			<Author>Javier Aibar</Author>
			<SnippetTypes>
				<SnippetType>Expansion</SnippetType>
			</SnippetTypes>
		</Header>
		<Snippet>
			<Declarations>
				<Literal Editable="false">
					<ID>classname</ID>
					<ToolTip>Nombre de clase</ToolTip>
					<Function>ClassName()</Function>
					<Default>ClassNamePlaceholder</Default>
				</Literal>
			</Declarations>
			<Code Language="csharp"><![CDATA[static $classname$ instance;
			private void Awake()
			{
				if (instance == null)
				{
					instance = this;
					DontDestroyOnLoad(gameObject);
				}
				else
				{
					Destroy(gameObject);
				}
			}$end$]]>
			</Code>
		</Snippet>
	</CodeSnippet>
</CodeSnippets>
``` 

Otra forma del implementar singleton es el mostrado por SamYam en su video [multiplayer](https://youtu.be/swIM2z6Foxk?t=5836), disponible en [su github](https://gist.github.com/sam-yam/4a5a0460f51e2f7c066cb644504f8de0) y en [mi drive](https://drive.google.com/file/d/1knfQf8R8ja8cts2RltblVB8SOsOFJRtp/view?usp=share_link)

Simplemente pones el archivo Singleton.cs en tu proyecto, y se implementa sustituyendo `MonoBehaviour` por `Singleton<NombreDeTuClase>`

Ten en cuenta que con este modo, al hacer Awake, tendrás que hacerlo público y sobreescribirlo (override) y poner base.Awake()

```cs 
public override void Awake()
{
    base.Awake();
}
``` 