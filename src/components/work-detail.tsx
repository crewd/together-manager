import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function WorkDetail({
  title,
  content,
  span,
  storeId,
  workId,
}: {
  title: string;
  content: string;
  span: number;
  storeId: string;
  workId: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`min-h-[260px] w-[280px] rounded-lg border bg-white p-4 shadow ${
        span <= 1 && 'col-span-3'
      }`}
    >
      <div className="flex items-center justify-end gap-4 pb-3 text-gray-500">
        <FontAwesomeIcon
          icon={faPen}
          className="cursor-pointer"
          onClick={() => navigate(`/store/${storeId}/work/${workId}/edit`)}
        />
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer" />
      </div>
      <h1 className="mb-4 text-center text-xl font-bold">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default WorkDetail;
