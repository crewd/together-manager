import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreateNoticePage() {
  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="text-2xl font-bold">공지사항</h2>
      <div className="mt-6 shadow-md">
        <input
          type="text"
          placeholder="제목"
          className="w-full border border-b-0 border-[#ccc] px-3 py-3 outline-none"
        />
        <div className="h-[542.84px] bg-white">
          <ReactQuill style={{ height: '500px' }} theme="snow" />
        </div>
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
