(function () {
  const NAMESPACE = "shashwat-bulusu";
  const KEY = "pinocchio-presaves";
  const GET_URL = `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`;
  const HIT_URL = `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;
  const STORAGE_FLAG = "pinocchio-presaved";
  const STORAGE_FALLBACK_COUNT = "pinocchio-fallback-count";

  const counterEl = document.getElementById("counterNumber");
  const btnEl = document.getElementById("presaveBtn");
  const captionEl = document.getElementById("portraitCaption");

  function renderCount(count) {
    counterEl.textContent = count.toLocaleString();
  }

  function fallbackCount() {
    return parseInt(localStorage.getItem(STORAGE_FALLBACK_COUNT) || "0", 10);
  }

  function setFallbackCount(n) {
    localStorage.setItem(STORAGE_FALLBACK_COUNT, String(n));
  }

  async function loadCount() {
    try {
      const res = await fetch(GET_URL);
      const data = await res.json();
      renderCount(data.value || 0);
    } catch (err) {
      renderCount(fallbackCount());
    }
  }

  async function registerPresave() {
    try {
      const res = await fetch(HIT_URL);
      const data = await res.json();
      renderCount(data.value);
    } catch (err) {
      const next = fallbackCount() + 1;
      setFallbackCount(next);
      renderCount(next);
    }
  }

  function markPresaved() {
    localStorage.setItem(STORAGE_FLAG, "true");
    btnEl.dataset.presaved = "true";
    btnEl.textContent = "Pre-Saved";
    captionEl.classList.add("is-visible");
  }

  if (localStorage.getItem(STORAGE_FLAG) === "true") {
    markPresaved();
  }

  btnEl.addEventListener("click", function () {
    if (localStorage.getItem(STORAGE_FLAG) === "true") return;
    markPresaved();
    registerPresave();
  });

  loadCount();
})();
