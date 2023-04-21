export type Notice = {
  title: string;
  content: string;
  noticeId?: string;
};

export type NoticeState = {
  notices: Notice[];
  isLoading: boolean;
  error: string | null;
};
