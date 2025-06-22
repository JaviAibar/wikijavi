```cs 
private void OnDrawGizmos()
    {
        Gizmos.color = Color.red;
        //Gizmos.DrawLine(transform.position, marker.position);
        Gizmos.DrawRay(Vector3.zero, new Vector3(-0.47f, 0.9f, 0));

        Gizmos.color = Color.green;
        Gizmos.DrawRay(Vector3.zero,Vector3.up);
        Gizmos.DrawRay(Vector3.zero,Vector3.right);
        Gizmos.DrawRay(Vector3.zero,Vector3.down);
        Gizmos.DrawRay(Vector3.zero,Vector3.left);

        Gizmos.DrawRay(Vector3.zero,Vector3.up+Vector3.right);
        Gizmos.DrawRay(Vector3.zero,Vector3.down + Vector3.right);
        Gizmos.DrawRay(Vector3.zero,Vector3.down + Vector3.left);
        Gizmos.DrawRay(Vector3.zero,Vector3.up+ Vector3.left);
    }
    ``` 
    