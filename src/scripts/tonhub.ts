import {TonhubConnector, TonhubCreatedSession, TonhubSessionAwaited, TonhubTransactionRequest, TonhubTransactionResponse } from "ton-x";


export const connector = new TonhubConnector({network: "sandbox"});

export async function getSession() : Promise<TonhubCreatedSession> {
    const session: TonhubCreatedSession = await connector.createNewSession({
        name: 'test_app_name_',
        url: 'https://www.google.com/'
    });
    console.log(session);
    return session;
}

export async function waitSession(sessionId: string, timeoutMin: number = 5) : Promise<TonhubSessionAwaited> {
    const session: TonhubSessionAwaited = await connector.awaitSessionReady(sessionId, timeoutMin * 60 * 1000);
    console.log(session);
    return session;
}

export async function sendCoins(to: string, amount: number, message: string, sessionSeed: string, appPublicKey: string, timeoutMin: number = 5): Promise<void> {
    const request: TonhubTransactionRequest = {
      seed: sessionSeed,
      appPublicKey: appPublicKey,
      to: to,
      value: amount.toString(),
      timeout: timeoutMin * 60 * 1000,
      text: message,
    };
    
    const response: TonhubTransactionResponse = await connector.requestTransaction(request);

    console.log(response);

    if (response.type === 'rejected') {
        // Handle rejection
    } else if (response.type === 'expired') {
        // Handle expiration
    } else if (response.type === 'invalid_session') {
        // Handle expired or invalid session
    } else if (response.type === 'success') {
        // Handle successful transaction
        const externalMessage = response.response; // Signed body of external message that was sent to the network
        console.log(externalMessage);
    } else {
        throw new Error('Impossible');
    }
  }
