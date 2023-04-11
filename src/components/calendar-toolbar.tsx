import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { NavigateAction } from 'react-big-calendar';

function CalenderToolbar({
  date,
  onNavigate,
}: {
  date: Date;
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
}) {
  const navigate = (action: NavigateAction) => {
    onNavigate(action);
  };

  return (
    <div className="flex w-full justify-center pb-4">
      <span className="flex gap-6">
        <button className="text-2xl" onClick={navigate.bind(null, 'PREV')}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <p className="text-2xl font-bold">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</p>
        <button className="text-2xl" onClick={navigate.bind(null, 'NEXT')}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </span>
    </div>
  );
}

export default CalenderToolbar;
