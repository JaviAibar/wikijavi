# Cuando esperas siempre un solo match

```cs 
using System;
using System.Text.RegularExpressions;
					
public class Program
{
	public static void Main()
	{
		var match = Regex.Match("/mifrase", @"[\\\/]([\w ]+)$");
		Console.WriteLine($"Groups.Count {match.Groups.Count} | Group[1] {match.Groups[1]}");
	}
}
``` 


# Cuando esperas que podría haber varios matches

```cs 
using System;
using System.Text.RegularExpressions;
					
public class Program
{
	public static void Main()
	{
            var matches = Regex.Matches("/mifrase", @"[\\\/]([\w ]+)$");
	      foreach (Match match in matches)
              {
                    GroupCollection groups = match.Groups;
                    Console.WriteLine($"Groups.Count {groups.Count}");
	            foreach(Group g in groups) {
			Console.WriteLine($"\t{g}");
		    }
              }
	}
}
``` 

# Para reemplazar texto con regex

```cs 
string text = Regex.Replace("holaaaaa que taaaal", @"a+", "a");
``` 
