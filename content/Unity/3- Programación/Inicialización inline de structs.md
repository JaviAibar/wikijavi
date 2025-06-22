Para la siguiente estructura de ejemplo

```cs 
public struct ClientRpcParams
{
	public ClientRpcSendParams Send;
	public ClientRpcReceiveParams Receive;
}
``` 

Esto es Send
```cs 
public struct ClientRpcSendParams
{
	public IReadOnlyList<ulong> TargetClientIds;
	public NativeArray<ulong>? TargetClientIdsNativeArray ;
}
``` 

Quedaría así

```cs 
private ClientRpcParams _cParams = new ClientRpcParams() {
	Send = new ClientRpcSendParams() {
		TargetClientIds = new ulong[] { ulong.MaxValue }
	}
};
``` 

