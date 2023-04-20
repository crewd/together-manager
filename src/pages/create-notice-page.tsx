import { useState } from 'react';
import Editor from '../components/editor';

function CreateNoticePage() {
  const [content, setContent] = useState<string>();

  const onChageEditor = (value: string) => {
    setContent(value);
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
        <button className="rounded-md border bg-blue-500 px-8 py-2 text-white shadow transition-colors duration-200">
          작성
        </button>
      </div>
    </div>
  );
}

export default CreateNoticePage;
