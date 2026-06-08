# 3 usos diferentes

```cs 
IEnumerator enumerator = enumerable.GetEnumerator();

while (enumerator.MoveNext())
{
    object item = enumerator.Current;
    // Perform logic on the item
}
``` 

```cs 
foreach(object item in enumerable)
{
    // Perform logic on the item
}
``` 
