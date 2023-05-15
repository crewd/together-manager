export type Category = {
  id: string;
  storeId: string;
  name: string;
};

export type CategoryState = {
  categories: Category[];
  isLoading: boolean;
  error: string | undefined;
};
