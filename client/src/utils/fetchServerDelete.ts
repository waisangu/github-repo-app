import { IServerResponseItem } from "../types/types";

export const fetchServerDelete = async (result: IServerResponseItem) => {
  try {
    // Deletes the favorited repo from database if it exists
    const response = await fetch(
      `http://localhost:8000/favorites/:${result.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // Handles if no error on fetch but API response status is not 200-299
    if (!response.ok) {
      throw new Error(
        `Error: Status Code ${response.status}. Failed to delete repository.`
      );
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
