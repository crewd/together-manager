export type Notice = {
  title: string;
  content: string;
  noticeId: string;
  createdAt: string;
};

export type NoticeForm = {
  title: string;
  content: string;
};

export type NoticeState = {
  notices: Notice[];
  isLoading: boolean;
  error: string | null;
};
