export type Notice = {
  storeId: string;
  title: string;
  content: string;
  noticeId: string;
  createdAt: string;
};

export type NoticeFormData = {
  storeId: string;
  title: string;
  content: string;
};

export type updateNoticeFormData = {};

export type NoticeState = {
  notices: Notice[];
  isLoading: boolean;
  error: string | undefined;
};
