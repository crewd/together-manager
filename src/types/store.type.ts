export type Store = {
  storeName: string;
  address: string;
  members?: number;
};

export type StoreState = {
  stores: Store[];
  isLoading: boolean;
  error: string | null;
};

export type StoreForm = {
  storeName: string;
  address: string;
  detailAddress: string;
};
