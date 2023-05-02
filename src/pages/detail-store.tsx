import { Link, useNavigate, useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import 'moment/locale/ko';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Notice } from '../types/notice.type';
import { Store } from '../types/store.type';
import { useEffect } from 'react';

function DetailStore() {
  const events = [];

  const { storeId } = useParams();
  const navigate = useNavigate();

  const store: Store = useSelector(
    (state: RootState) => state.storeReducer.stores,
  ).filter((store) => store.storeId === storeId)[0];

  const notices: Notice[] = useSelector(
    (state: RootState) => state.noticeReducer.notices,
  ).filter((notice) => notice.storeId === storeId);

  useEffect(() => {
    if (!store) {
      return navigate('/');
    }
  }, []);

  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="w-full">
        <div>
          <p className="pb-4 text-2xl font-bold">📣 공지사항</p>
          <div className="flex flex-col bg-white border rounded-md shadow">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <Link
                  to={`/store/${storeId}/notice/${notice.noticeId}`}
                  className="p-4 text-xl font-bold transition-colors duration-200 hover:bg-gray-100"
                  key={notice.noticeId}
                >
                  {notice.title}
                </Link>
              ))
            ) : (
              <div className="p-4 ">
                <h3 className="text-xl font-semibold text-gray-500">
                  공지사항이 없습니다
                </h3>
              </div>
            )}
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
            <Link to="/" className="p-4 text-xl font-bold hover:bg-gray-100">
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
            allDayText=""
            slotMinTime={store.startTime}
            slotMaxTime={store.endTime}
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
