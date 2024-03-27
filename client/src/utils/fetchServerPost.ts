import { IServerResponseItem } from "../types/types";

export const fetchServerPost = async (result: IServerResponseItem) => {
  try {
    // Sends the favorited repo's data to be saved into the database
    const response = await fetch("http://localhost:8000/favorites", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    // Handles if no error on fetch but API response status is not 200-299
    if (!response.ok) {
      throw new Error(
        `Error: Status Code ${response.status}. Failed to favorite repository.`
      );
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
