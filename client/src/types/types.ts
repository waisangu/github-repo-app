import { IApiResponse, IItem } from "./octokit";

export interface ApiResponseProps {
  result: IItem;
}

export interface FavCounterState {
  value: number;
}

export interface PaginationProps {
  totalPages: number;
  setRepos: React.Dispatch<React.SetStateAction<IApiResponse>>;
}

export interface PaginationFavsProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export type AllowedSort =
  | "stars"
  | "forks"
  | "help-wanted-issues"
  | "updated"
  | undefined;

export type AllowedOrder = "desc" | "asc";

export interface IParams {
  q: string;
  sort?: AllowedSort;
  order: AllowedOrder;
  per_page: number;
  page: number;
}

export interface ParamSettingsState {
  q: string;
  sort?: AllowedSort;
  order: AllowedOrder;
  per_page: number;
  page: number;
}

export interface IServerResponseItem {
  id: number;
  owner_avatar_url: string;
  html_url: string;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface IServerRequestItem extends IServerResponseItem {}

export interface ServerResponseProps {
  result: IServerResponseItem;
}