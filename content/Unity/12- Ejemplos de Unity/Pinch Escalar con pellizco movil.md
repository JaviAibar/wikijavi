```cs 
private float factor;
    private float initialDistance;
    private Vector3 initialScale;
    private float currentDistance;
    public float minScale;
    public float maxScale;
    public float sensibility;
    public Transform targetTransform;

    void Start()
    {
        targetTransform = GetComponent<Transform>();
} 
private void Update()
    {
        CalculatePinch();
    }

    // Based on CREDIT: https://www.youtube.com/watch?v=ISBIu6Jzfk8&ab_channel=MohdHamza
    public void CalculatePinch()
    {
        if (Input.touchCount != 2) return;
        var touchZero = Input.GetTouch(0);
        var touchOne = Input.GetTouch(1);

        if (touchZero.phase is TouchPhase.Ended or TouchPhase.Canceled ||
            touchOne.phase is TouchPhase.Ended or TouchPhase.Canceled) return;

        if (touchZero.phase == TouchPhase.Began || touchOne.phase == TouchPhase.Began)
        {
            initialDistance = Vector2.Distance(touchZero.position, touchOne.position);
            initialScale = targetTransform.localScale;
        }
        else // fingers moved
        {
            currentDistance = Vector2.Distance(touchZero.position, touchOne.position);
            if (Mathf.Abs(initialDistance - currentDistance) < 0.01f || Mathf.Approximately(initialDistance, 0)) return;
            factor = currentDistance / initialDistance;
            targetTransform.localScale = initialScale * IntensifyBySensibility(factor);
            targetTransform.localScale = ClampVector3(targetTransform.localScale);
        }
    }

public Vector3 ClampVector3(Vector3 v)
    {
        if (v.x < minScale) return Vector3.one * minScale;
        if (v.x > maxScale) return Vector3.one * maxScale;
        return v;
    }

    public float IntensifyBySensibility(float value)
    {
        return (((value - 1) * sensibility) + 1);
    }
``` 


[PinchScaler.cs](https://drive.google.com/file/d/1jzU6jqIHdKDMcRMJifD6MkHG_DAlYMtC/view?usp=share_link)

