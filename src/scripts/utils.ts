import * as QRCode from "qrcode";
import { TonhubConnector, TonhubSessionAwaited, TonhubSessionStateReady, TonhubWalletConfig } from "ton-x";


export async function showQRCode(text: string, qrCanvas: HTMLElement | any): Promise<void> {
    QRCode.toCanvas(qrCanvas, text, function (error:any) {
        if (error) console.error(error);
    });
}

export async function showConnectResult(session: TonhubSessionAwaited, fromDiv: HTMLElement | any, resDiv: HTMLElement | any): Promise<TonhubWalletConfig | null> {
  fromDiv.innerHTML = "";
  resDiv.style.display = "none";

  if (session.state != "ready") {
    fromDiv.innerHTML = session.state;
    return null;
  } else {
    session = (session as TonhubSessionStateReady);
    fromDiv.innerHTML = session.wallet.address;
    resDiv.style.display = "initial";
    
    return session.wallet;   
  }
}
