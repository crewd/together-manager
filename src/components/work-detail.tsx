import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkDetail({
  title,
  content,
  span,
}: {
  title: string;
  content: string;
  span: number;
}) {
  return (
    <div
      className={`min-h-[260px] w-[280px] rounded-lg border bg-white p-4 shadow ${
        span <= 1 && 'col-span-3'
      }`}
    >
      <div className="flex items-center justify-end gap-4 text-gray-500">
        <FontAwesomeIcon icon={faPen} />
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <h1 className="mb-4 text-xl font-bold text-center">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default WorkDetail;
