import { useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({
  editorRef,
  defaultValue,
}: {
  editorRef: React.RefObject<ReactQuill>;
  defaultValue?: string;
}) {
  useEffect(() => {}, []);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image'],
        ],
      },
    };
  }, []);
  return (
    <div>
      <ReactQuill
        modules={modules}
        ref={editorRef}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default Editor;
