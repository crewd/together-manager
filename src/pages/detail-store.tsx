import { Link, useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import 'moment/locale/ko';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Store } from '../types/store.type';

function DetailStore() {
  const events = [
    {
      title: '홍길동',
      start: moment('2023-04-13 11:00').toDate(),
      end: moment('2023-04-13 16:00').toDate(),
    },
    {
      title: '홍길동',
      start: moment('2023-04-13 11:00').toDate(),
      end: moment('2023-04-13 16:00').toDate(),
    },
    {
      title: '홍길동',
      start: moment('2023-04-13 11:00').toDate(),
      end: moment('2023-04-13 16:00').toDate(),
    },
    {
      title: '홍길동',
      start: moment('2023-04-13 11:00').toDate(),
      end: moment('2023-04-13 16:00').toDate(),
    },
    {
      title: '홍길동',
      start: moment('2023-04-13 16:00').toDate(),
      end: moment('2023-04-13 21:00').toDate(),
    },
  ];

  const { storeId } = useParams();

  const dummyStore: Store = useSelector(
    (state: RootState) =>
      state.store.stores.filter((data) => data.storeId === storeId)[0],
  );

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1024px]">
        <div>
          <p className="pb-4 text-2xl font-bold">📣 공지사항</p>
          <div className="flex flex-col bg-white border rounded-md shadow">
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
          <div className="flex flex-col bg-white border rounded-md shadow">
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
          <p className="pb-4 text-2xl font-bold">⏱ 오늘의 근무표</p>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            locale={'ko'}
            events={events}
            allDayText=""
            slotMinTime={dummyStore.startTime}
            slotMaxTime={dummyStore.endTime}
            eventClassNames={'text-xl'}
            displayEventTime={false}
            headerToolbar={false}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailStore;
