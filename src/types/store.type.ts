export type Store = {
  storeName: string;
  address: string;
  storeId?: string;
  startTime: string;
  endTime: string;
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
  startTime: string;
  endTime: string;
};
