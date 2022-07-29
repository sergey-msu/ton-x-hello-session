import { TonhubCreatedSession, TonhubSessionAwaited, TonhubWalletConfig } from "ton-x";
import { getSession, waitSession } from './tonhub';
import { showQRCode, showConnectResult, withrawCoins } from "./utils";


const sessionBtn: HTMLElement | any = document.getElementById("ts-cap-btn")
const payBtn: HTMLElement | any = document.getElementById("ts-pay-btn")
const qrCancas: HTMLElement | any = document.getElementById("ts-qr-canvas");
const resDiv: HTMLElement | any = document.getElementById("ts-res-div");

let sessionId: string = "";
let sessionSeed: string = "";
let walletConfig: string = "";
let appPublicKey: string = "";

sessionBtn.addEventListener("click", async (e:any) => {
  e.preventDefault();

  const session: TonhubCreatedSession = await getSession();
  sessionId = session.id;
  sessionSeed = session.seed;
  await showQRCode(session.link, qrCancas);

  const result: TonhubSessionAwaited = await waitSession(session.id, 5);
  const wallet: TonhubWalletConfig | null = await showConnectResult(result, resDiv);
  if (wallet) {
    walletConfig = wallet.walletConfig;
    appPublicKey = wallet.appPublicKey;
  }
});

payBtn.addEventListener("click", async (e:any) => {
  e.preventDefault();

  await withrawCoins(sessionId, 1000000000);
});