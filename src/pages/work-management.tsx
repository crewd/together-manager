import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WorkManagement() {
  const addCategory = () => {
    const askCategory = prompt('카테고리 이름을 입력해 주세요');
    console.log(askCategory);
  };
  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold">💼 업무관리</h2>
        <button
          className="px-3 py-2 bg-white border rounded-md shadow hover:bg-blue-500 hover:text-white"
          onClick={addCategory}
        >
          <FontAwesomeIcon className="mr-2" icon={faPlus} />
          카테고리 추가
        </button>
      </div>
      <div className="w-full p-4 bg-white border rounded-md shadow">
        <p className="text-lg font-bold text-gray-500">
          카테고리를 추가하여 업무관리를 해보세요
        </p>
      </div>
    </div>
  );
}

// 직종 추가 ex) 홀, 서빙, 계산 등
// 분류 ex) 출근 후 30분, 퇴근 30분전 등
// 직종 페이지로 이동 후 분류 추가 (분류별 컴포넌트)
// 분류내에 업무 내용
// 직종 추가 -> 직종 페이지 이동 -> 직종 페이지 내 분류 추가 -> 분류 컴포넌트 안에 업무 내용 추가

export default WorkManagement;
