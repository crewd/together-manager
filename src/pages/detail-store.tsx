import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function DetailStore() {
  const localizer = momentLocalizer(moment);
  const events = [
    {
      title: '9시 예약',
      start: moment('2023-04-12 09:00').toDate(),
      end: moment('2023-04-12 10:00').toDate(),
    },
  ];
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[1024px]">
        <div>
          <p className="pb-4 text-2xl font-bold">📣 공지사항</p>
          <div className="flex flex-col rounded-md border bg-white shadow">
            <Link
              to="/"
              className="p-4 text-xl font-bold hover:underline hover:underline-offset-4"
            >
              공지사항 1
            </Link>
          </div>
        </div>
        <div className="pt-[36px]">
          <p className="pb-4 text-2xl font-bold">📝 오늘의 인수인계</p>
          <div className="flex flex-col rounded-md border bg-white shadow">
            <Link
              to="/"
              className="p-4 text-xl font-bold text-gray-400 line-through"
            >
              인수인계 1
            </Link>
            <Link
              to="/"
              className="p-4 text-xl font-bold hover:underline hover:underline-offset-4"
            >
              인수인계 2
            </Link>
          </div>
        </div>
        <div className="pt-9">
          <p className="pb-4 text-2xl font-bold">📆 오늘의 일정</p>
          <div className="overflow-x-scroll">
            <Calendar
              toolbar={false}
              localizer={localizer}
              view="day"
              startAccessor="start"
              endAccessor="end"
              events={events}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailStore;
