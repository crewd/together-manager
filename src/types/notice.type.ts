export type Notice = {
  storeId: string;
  title: string;
  content: string;
  noticeId: string;
  createdAt: string;
};

export type NoticeFormData = {
  title: string;
  content: string;
};

export type NoticeState = {
  notices: Notice[];
  isLoading: boolean;
  error: string | undefined;
};
