Son las que se le pasan al `setContent {  ` para que dibuje la interfaz

Nos permiten que la interfaz sea modular

```kotlin 
@Composable  
fun DrawCoins(plusAction: (String) -> Unit, minusAction:(String) -> Unit) {  
    coinTypes.forEachIndexed { index, coin ->  
        println("Hay ${coinsCount[index]} monedas de ${coin.name}")  
        CoinRow(  
            imageRes = coin.img,  
            label = coin.name,  
            count = coinsCount[index],  
            onPlus = { plusAction(coin.name) },  
            onMinus = { minusAction(coin.name) },  
            value = coin.value  
        )  
    }  
}
``` 

