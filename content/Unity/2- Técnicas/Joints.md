Tendremos hasta 3 elementos

1. el ancla
    
2. la conexión (el palo, cadena..) conecta el extremo (si lo hubiese) con el ancla
    
3. El extremo
    

El ancla es el punto que hará de pivote, y tendrá un rigid body en kinematic

La conexión tendrá un riggid body, colider (? y configurable joint. Este configurable joint apuntará al ancla, habrá que configrar los limites para oscile desde donde queremos, cambiamos los valores de "anchor" para que coincida con la posición en la que tenemos el ancla, x, y, z Motion tiene que estar en "Locked"

El extremo será hijo de la conexión, si quisieramos que golpease, podría llevar un collider