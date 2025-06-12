```cs 
public class DontDestroy : MonoBehaviour
{
    void Awake()
    {
        
        if (FindObjectsOfType(typeof(GameObject)).Length > 1)
        {
            Destroy(this.gameObject);
        }

        DontDestroyOnLoad(this.gameObject);
    }
}
``` 
