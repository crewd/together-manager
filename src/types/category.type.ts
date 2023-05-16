export type CategoryType = {
  id: string;
  storeId: string;
  name: string;
};

export type CategoryState = {
  categories: CategoryType[];
  isLoading: boolean;
  error: string | undefined;
};
