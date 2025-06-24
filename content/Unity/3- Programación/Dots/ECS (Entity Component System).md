Optimiza teniendo en mente el funcionamiento de la RAM, la cache y la CPU (y su cache también).

Normalmente programamos orientado a objetos, pero con este método programas orientado a datos, es decir, creando bloques de información del mismo arquetipo (o tipo de dato) para minimizar los fallos de RAM. es algo así como cuando vas a tomar un bit de información, tomas todo un chunk (de 16KB) de información para usarla a la vez

ECS significa:

- Entity - Indices e ID de la info
    
- Component - La info en sí
    
- System - Los manejadores de la info (algo así como controllers)
    

## Component

Debido a que funciona con chunks de 16KB, si tenemos muchos arquetipos con poco info, nos provocará pérdida de espacio en RAM.

## System

Con los System hay que tener MUCHO cuidado con el orden en el que se ejecutan las cosas.

Cada frame está dividido en

- Grupo de inicialización (no habrá mucho que hacer)
    
- Grupo de simulación (donde va la mayoría de cosas)
    
- Grupo de presentación (donde se produce el renderizado)