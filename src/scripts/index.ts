import { TonhubCreatedSession, TonhubSessionAwaited, TonhubWalletConfig } from "ton-x";
import { getSession, waitSession, sendCoins } from './tonhub';
import { mobileAndTabletCheck, showQRCode, showQRButton, showConnectResult } from "./utils";


const connectBtn: HTMLElement | any = document.getElementById("ts-cap-btn")
const payBtn: HTMLElement | any = document.getElementById("ts-pay-btn")
const resDiv: HTMLElement | any = document.getElementById("ts-res-div");
const linkDiv: HTMLElement | any = document.getElementById("ts-link-div");
const fromDiv: HTMLElement | any = document.getElementById("ts-from-div");
const recipientInput: HTMLElement | any = document.getElementById("ts-to-input");

let sessionId: string = "";
let sessionSeed: string = "";
let walletConfig: string = "";
let appPublicKey: string = "";


connectBtn.addEventListener("click", async (e:any) => {
  e.preventDefault();

  const session: TonhubCreatedSession = await getSession();
  sessionId = session.id;
  sessionSeed = session.seed;
  const isMobile = mobileAndTabletCheck();
  if (isMobile) {
    await showQRButton(session.link, linkDiv);
  } else {
    await showQRButton(session.link, linkDiv);
  }

  const result: TonhubSessionAwaited = await waitSession(session.id);
  const wallet: TonhubWalletConfig | null = await showConnectResult(result, fromDiv, resDiv);
  if (wallet) {
    walletConfig = wallet.walletConfig;
    appPublicKey = wallet.appPublicKey;
  }
});

payBtn.addEventListener("click", async (e:any) => {
  e.preventDefault();

  await sendCoins(recipientInput.value, 1000000000, "Here's your money", sessionSeed, appPublicKey);
});
