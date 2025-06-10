1. Un nivel de indentación por método
2. No uses la palabra clave ELSE
3. Envuelve primitivos
	Se refiere a que crees objetos con las primitivas para que tenga más semántica, sea mejor sintácticamente (te ayuda el ide) y permite añadir métodos 
4. Colecciones como clases de primer orden
	cualquier clase que contenga una colección no debería contener más atributos. Cada coleccion en su propia clase, así tienen lugar otros metodos como ordenacion p.e.
5. Aplica la Ley de Demeter
	O principio del mejor conocimiento, que cada clase juegue con sus juguetes o los juguetes que otros le dan, nunca con los juguetes de sus juguetes
6. No abrevies
7. Mantén las entidades pequeñas
8. Evita más de dos atributos de instancia
9. Evita getters/setters o atributos públicos
10. Clases con estado, evita métodos estáticos
vía: https://keyvanakbary.com/object-calisthenics-mejora-tu-diseno-orientado-a-objetos/
vía: https://samuelcasanova.com/2016/09/resumen-clean-code/     PDF

Ejemplo Demeter

Pasar de esto
```cs 
class Piece {
    public $representation;
}

class Location {
    public $currentPiece;
}

class Board {
    public function boardRepresentation() {
        $representation = '';

        foreach ($this->squares() as $location) {
            $representation .= $location->currentPiece->representation[0];
        }

        return $representation;
    }
}
``` 

a esto

```cs
class Piece {
    private $representation;

    private function character() {
        return $this->representation[0];
    }

    public function addTo($str) {
        return $str . $this->character();
    }
}

class Location {
    public $currentPiece;

    public function addTo($str) {
        return $this->currentPiece->addTo($str);
    }
}

class Board {
    public function boardRepresentation() {
        $representation = '';

        foreach ($this->squares() as $location) {
            $representation = $location->addTo($representation);
        }

        return $representation;
    }
}
```

![[../../../../zz Media/Resumen Clean Code _.pdf]]