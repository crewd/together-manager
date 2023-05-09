export type Memo = {
  memoId: string;
  storeId: string;
  content: string;
  date: string;
  author: string;
  checked: boolean;
  completer: string;
};

export type MemoState = {
  memos: Memo[];
  isLoading: boolean;
  error: string | undefined;
};
