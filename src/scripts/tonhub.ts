import {TonhubConnector, TonhubCreatedSession, TonhubSessionAwaited } from "ton-x";


export const connector = new TonhubConnector({network: "sandbox"});

export async function getSession() : Promise<TonhubCreatedSession> {
    const session: TonhubCreatedSession = await connector.createNewSession({
        name: 'test_app_name_',
        url: 'https://www.google.com/'
    });
    console.log(session);
    return session;
}

export async function waitSession(sessionId: string, timeoutMin: number) : Promise<TonhubSessionAwaited> {
    const session: TonhubSessionAwaited = await connector.awaitSessionReady(sessionId, timeoutMin * 60 * 1000);
    console.log(session);
    return session;
}
