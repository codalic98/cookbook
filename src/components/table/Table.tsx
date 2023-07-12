export interface Recipies {
  id: string;
  name: string;
  preparation: string;
  favorite: boolean;
}

export enum PageEnum {
  list,
  add,
  edit,
  favorites,
}
