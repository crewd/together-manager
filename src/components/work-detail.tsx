import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkDetail({ title, content }: { title: string; content: string }) {
  return (
    <div className="min-h-[260px] w-[280px] rounded-lg border bg-white p-4 shadow">
      <div className="flex items-center justify-end gap-4 text-gray-500">
        <FontAwesomeIcon icon={faPen} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <h1 className="mb-4 text-center text-xl font-bold">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default WorkDetail;
