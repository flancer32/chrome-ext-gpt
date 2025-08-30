export default class GptExt_Ui_Page_Prompts {
  constructor() {
    const DB_NAME = "gptExt";
    const STORE_NAME = "prompts";
    let db;

    function openDb() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => {
          request.result.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        };
        request.onsuccess = () => {
          db = request.result;
          resolve();
        };
        request.onerror = () => reject(request.error);
      });
    }

    function getAllPrompts() {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    function addPrompt(text) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.add({ text });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    function deletePrompt(id) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    function render(prompts) {
      const list = document.getElementById("prompt-list");
      list.innerHTML = "";
      prompts.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = p.text;
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", async () => {
          await deletePrompt(p.id);
          render(await getAllPrompts());
        });
        li.appendChild(btn);
        list.appendChild(li);
      });
    }

    return {
      async init() {
        await openDb();
        document.getElementById("add").addEventListener("click", async () => {
          const input = document.getElementById("new-prompt");
          const text = input.value.trim();
          if (text) {
            await addPrompt(text);
            input.value = "";
            render(await getAllPrompts());
          }
        });
        render(await getAllPrompts());
      },
    };
  }
}
