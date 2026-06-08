## Características

- Objetos muy pequeños
    
- Tienen lo mismo que una clase (constructores -obligatorio usar parámetros-, campos, métodos, etc)
    
- Ocupa menos memoria que un objeto de clase
    
- No dejan herencia pero pueden tomarla de una class
    
- No es necesario usar "new"
    

EjemploStruct os;

os.x = 2;

- Los struct solo se pasan por valor. Es decir, lo que pasamos al método es una copia del original. Eso quiere decir que si pasamos una instancia a un método y editamos sus valores desde el método, el struct original no cambia (a diferencia de lo que pasa con los objetos). Ejemplo:
    

public void CambiaValores(EjemploStruct copia) {

    copia.x = 10;

}

EjemploStruct original = new EjemploStruct(1, 2);

CambiaValores(original);

print(original); // (1, 2)

Sin embargo, si uno de los miembros fuera un objeto, por ejemplo un string (que pasa por ref), entonces sí se editará. Ejemplo:

public void CambiaValores(EjemploStruct copia) {

    copia.x = 10;

    copia.texto = "Javi";

}

EjemploStruct original = new EjemploStruct(1, 2);

print(original); // Inicio (1, 2)

CambiaValores(original);

print(original); // Javi (1, 2)

Puedes, pasar por valor si lo indicas en el método y al pasar el argumento:

public void CambiaValores(ref EjemploStruct copia) {

    copia.x = 10;

}

EjemploStruct original = new EjemploStruct(1, 2);

CambiaValores(ref original);

print(original); // (10, 2)

Podemos crear mutaciones con la palabra clave with 

public static void Main()

{

    var p1 = new Coords(0, 0);

    Console.WriteLine(p1);  // output: (0, 0)

  

    var p2 = p1 with { X = 3 };

    Console.WriteLine(p2);  // output: (3, 0)

  

    var p3 = p1 with { X = 1, Y = 4 };

    Console.WriteLine(p3);  // output: (1, 4)

}