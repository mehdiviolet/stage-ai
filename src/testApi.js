import { apiClient } from "./lib/api/client";

async function testApi() {
  try {
    const response = await apiClient.get(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    console.log(response.data);

    const postResponse = await apiClient.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "Test",
        body: "Corpo del post",
        userId: 1,
      }
    );

    console.log(postResponse.data);
  } catch (err) {
    console.error(err.message);
  }
}
testApi();
