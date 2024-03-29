import { IServerResponseItem } from "../types/types";

export const fetchServerGet = async (): Promise<IServerResponseItem | void> => {
  try {
    // Default method is GET, retrieves entire array of favorited repos in database
    const response = await fetch("http://localhost:8000/favorites");

    // Handles if no error on fetch but API response status is not 200-299
    if (!response.ok) {
      throw new Error(
        `Error: Status Code ${response.status}. Failed to get repositories.`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
