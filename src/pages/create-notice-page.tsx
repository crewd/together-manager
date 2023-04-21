import { useState } from 'react';
import Editor from '../components/editor';
import { Notice } from '../types/notice.type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { NoticeActionTypes, addNotice } from '../store/modules/notice';

function CreateNoticePage() {
  const [content, setContent] = useState<string>();

  const notices = useSelector((state: RootState) => state.notice.notices);

  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, NoticeActionTypes>>();

  const onChageEditor = (value: string) => {
    setContent(value);
  };

  const onSubmitNotice = () => {
    const dummyData: Notice = {
      title: '공지사항 1',
      content: '공지사항1 입니다.',
    };
    dispatch(addNotice(dummyData));
  };

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">공지사항</h2>
      <div className="mt-6 bg-white shadow-md">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-[#ccc] px-3 py-3 outline-none"
        />
        <Editor onChageEditor={onChageEditor} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          className="rounded-md border bg-blue-500 px-8 py-2 text-white shadow transition-colors duration-200"
          onClick={onSubmitNotice}
        >
          작성
        </button>
      </div>
    </div>
  );
}

export default CreateNoticePage;
