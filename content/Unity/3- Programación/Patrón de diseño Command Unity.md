# ¿Qué es?

Es un patrón de diseño que encapsula la lógica de una acción o evento y la configura para que se pueda llamar después desde otro script.

Esto mantiene el código limpio, aislado y simplifica el proceso de llamar a un acción o evento.

# Ejemplo

La acción de mover está anclada a este script en concreto, pero ¿y si quisiéramos que fuera modular y así cualquier script pudiera ejecutar esta acción?

```cs 
if(Input.GetKeyDown(Keycode.S))
{
  transform.Translate(Vector3.back);
}
``` 

Encapsulamos esa acción en una clase comando. Ahora esa acción la realiza el comando Execute. Puede parecer un trabajo inútil, pero ahora esta acción se puede almacenar, pasar por parámetro y manipular como necesitemos

```cs 
class MoveCommand
{
  Transform moved;
  
  public MoveCommand(Transform target)
  {
      moved = target;
  }
  public void Execute()
  {
      moved.Translate(Vector3.back);
  }
}
//then where we detect input
if(Input.GetKeyDown(Keycode.S))
{
  MoveCommand command = new MoveCommand(transform);
  command.Execute();
}
``` 

El uso de este patrón es limitado ya que normalmente los programadores prefieren usar simplemente delegados, sin embargo, es especialmente **útil** en ciertas situaciones. Ejemplo de ello es el de implementar la funcionalidad **deshacer**. Como ahora las acciones son objetos, podemos llevar fácilmente un registro y ejecutarlas en sentido inverso.