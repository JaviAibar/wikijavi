En realidad, es equivalente a multiplicar por 2 (o dividir entre 2)
## De binario a entero

```python
a=int('101',2)
print(a) # 5

b=int('1100000000000000000000', 2)
print(b) # 3145728
```

## De entero a binario

```python
a=int('101',2)
print(a) # 5

b=bin(a) # a que está en decimal lo pasamos a binario
print(b) # 0b101
```

## Mover un bit a la izquierda

> [!Note] Siempre se añade un 0
> a <<= 1 añade un 0 al lado derecho

```python
a=int('101',2)
print(a) # 5

a <<= 1
print(a) # 10, es decir 1010 en binario
```

## Mover un bit a la derecha

```python
a=int('101',2)
print(a) # 5

a <<= 1
print(a) # 2 se pierde el bit de la derecha, por eso es 10 en binario, 2 en decimal
```