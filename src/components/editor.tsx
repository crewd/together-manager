import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ onChageEditor }: { onChageEditor: (value: string) => void }) {
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
  return <ReactQuill theme="snow" modules={modules} onChange={onChageEditor} />;
}

export default Editor;
