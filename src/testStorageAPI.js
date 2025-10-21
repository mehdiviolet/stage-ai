import { apiClient } from "./lib/api/client";
import { local } from "./lib/storage/local";

async function testStorageAPI() {
  try {
    // 1.Chiamata API
    const response = await apiClient.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    // 2.Salva in localStorage
    local.set("testUser", response.data);
    // 3.Leggi da localStorage
    const saved = local.get("testUser");
    console.log("Dati salvati", saved.name);
    // 4.pulisci
    local.remove("testUser");
  } catch (err) {
    console.error(err.message);
  }
}

testStorageAPI();
