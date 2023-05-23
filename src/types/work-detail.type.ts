export type WorkDetail = {
  id: string;
  categoryId: string;
  title: string;
  content: string;
};

export type WorkDetailState = {
  workDetails: WorkDetail[];
  isLoading: boolean;
  error: string | undefined;
};
