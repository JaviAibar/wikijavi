```kotlin 
Spacer(modifier = Modifier.width(8.dp))
``` 
```kotlin 
Spacer(Modifier.height(8.dp))
``` 


```kotlin 
Row(  
    verticalAlignment = Alignment.CenterVertically  
    horizontalArrangement = Arrangement.Center
) { 

}
``` 

```kotlin 
Image(  
    painter = painterResource(id = imageRes),  
    contentDescription = label,  
    modifier = Modifier.size(100.dp, 50.dp)  
)
``` 

```kotlin 
Button(onClick = onMinus) {  
    Text("-")  
}
``` 

```kotlin 
Button(  
    onClick = { switchPause() }, modifier = Modifier  
        .align(  
            Alignment.BottomCenter  
        )  
        .fillMaxWidth()  
) {  
    Text(if (isInPause) "Reanudar" else "Pausa")  
}
``` 



```kotlin 
Text(count.toString(), fontSize = 19.sp ,modifier = Modifier.width(10.dp))
``` 

> [!note] Interesante
> Fíjate que en el Column está activado el Scroll

```kotlin 
Column(  
    modifier = Modifier  
        .verticalScroll(rememberScrollState())  
        .padding(10.dp, 40.dp)  
  
) {

}
``` 

 Box es aparentemente un ContentSizeFitter

```kotlin 
Box(  
    modifier = Modifier  
        .fillMaxSize()  
        .padding(40.dp)  
) {

}
``` 

# Modifier

