import axios from "axios";

async function creaPost() {
  try {
    const nuovoPost = {
      title: "Il mio test",
      body: "Questo è un messaggio TEST",
      userId: 1,
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      nuovoPost
    );

    console.log("Post creato", response.data);
  } catch (error) {
    console.error("Errore:", error);
  }
}

creaPost();
