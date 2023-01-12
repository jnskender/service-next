import Popup from "src/components/Popup.svelte";
import { storage } from "src/storage";

const target = document.getElementById("app");

function render() {
  storage.get().then(() => {
    new Popup({ target });
  });
}

document.addEventListener("DOMContentLoaded", render);
