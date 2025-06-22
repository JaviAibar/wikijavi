```cs 
public void DisconnectClient(ulong clientId)
        {
            if (m_HasSessionStarted)
            {
                // Mark client as disconnected, but keep their data so they can reconnect.
                if (m_ClientIDToPlayerId.TryGetValue(clientId, out var playerId))
                {
                    if (GetPlayerData(playerId)?.ClientID == clientId)
                    {
                        var clientData = m_ClientData[playerId];
                        clientData.IsConnected = false;
                        m_ClientData[playerId] = clientData;
                    }
                }
            }
            else
            {
                // Session has not started, no need to keep their data
                if (m_ClientIDToPlayerId.TryGetValue(clientId, out var playerId))
                {
                    m_ClientIDToPlayerId.Remove(clientId);
                    if (GetPlayerData(playerId)?.ClientID == clientId)
                    {
                        m_ClientData.Remove(playerId);
                    }
                }
            }
        }
        ``` 
        