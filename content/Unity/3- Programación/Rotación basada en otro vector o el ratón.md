```cs 
Vector3 target = Camera.main.ScreenPointToRay(Input.mousePosition).origin;
target.x = target.x - transform.position.x;
target.y = target.y - transform.position.y;
float angle = Mathf.Atan2(target.y, target.x) * Mathf.Rad2Deg;
transform.rotation = Quaternion.Euler(new Vector3(0, 0, angle)); 
``` 
