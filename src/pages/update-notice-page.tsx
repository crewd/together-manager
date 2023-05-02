import ReactQuill from 'react-quill';
import Editor from '../components/editor';
import { useRef } from 'react';

function UpdateNoticePage() {
  const editorRef = useRef<ReactQuill>(null);

  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">공지사항</h2>
      <div className="mt-6 bg-white shadow-md">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-[#ccc] px-3 py-3 outline-none"
        />
        <Editor editorRef={editorRef} />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-8 py-2 text-white transition-colors duration-200 bg-blue-500 border rounded-md shadow">
          작성
        </button>
      </div>
    </div>
  );
}

export default UpdateNoticePage;
