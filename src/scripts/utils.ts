import * as QRCode from "qrcode";
import { TonhubConnector, TonhubSessionAwaited, TonhubSessionStateReady, TonhubWalletConfig } from "ton-x";


export async function showQRCode(text: string, qrCanvas: HTMLElement | any): Promise<void> {
    QRCode.toCanvas(qrCanvas, text, function (error:any) {
        if (error) console.error(error);
    });
}

export async function showConnectResult(session: TonhubSessionAwaited, resDiv: HTMLElement | any): Promise<TonhubWalletConfig | null> {
  resDiv.innerHTML = "";

  if (session.state != "ready") {
    resDiv.innerHTML = session.state;
    return null;
  } else {
    session = (session as TonhubSessionStateReady);
    resDiv.innerHTML = session.wallet.address;
    return session.wallet;   
  }
}

export async function withrawCoins(sessionId: string, amount: number | any): Promise<void> {
  console.log(amount.toString() + " nanotons sended...");
}

