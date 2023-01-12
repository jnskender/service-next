import Overlay from "../components/Overlay.svelte";
import mainWorld from "../injectCode?script&module";
import { storage } from "../storage";

// Some global styles on the page
import "./styles.css";

// Some JS on the page
storage.get().then(console.log);

//new Overlay({ target: document.body });
//https://dev.to/jacksteamdev/advanced-config-for-rpce-3966#dynamic-content-scripts
const script = document.createElement("script");
script.src = chrome.runtime.getURL(mainWorld);
script.type = "module";
document.head.prepend(script);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting === "hello") {
    const el = document.querySelector("#pro-code-extension");
    console.log(el);
    sendResponse({ el: (el as HTMLElement).dataset.g_ck });
  }
});
