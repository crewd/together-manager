import ReactQuill from 'react-quill';
import Editor from '../components/editor';
import { useRef } from 'react';
import { Notice } from '../types/notice.type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { useParams } from 'react-router-dom';

function UpdateNoticePage() {
  const editorRef = useRef<ReactQuill>(null);

  const { noticeId } = useParams();

  const notice: Notice = useSelector(
    (state: RootState) => state.noticeReducer.notices,
  ).filter((notice) => notice.noticeId === noticeId)[0];

  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">공지사항</h2>
      <div className="mt-6 bg-white shadow-md">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-[#ccc] px-3 py-3 outline-none"
          defaultValue={notice.title}
        />
        <Editor editorRef={editorRef} defaultValue={notice.content} />
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button className="rounded-md border bg-blue-500 px-8 py-2 text-white shadow transition-colors duration-200">
          수정
        </button>
      </div>
    </div>
  );
}

export default UpdateNoticePage;
