function WorkManagement() {
  return (
    <div className="container mx-auto max-w-[1024px]">
      <h2 className="pb-6 text-2xl font-bold">💼 업무관리</h2>
      <div className="">직종 추가</div>
    </div>
  );
}

// 직종 추가 ex) 홀, 서빙, 계산 등
// 분류 ex) 출근 후 30분, 퇴근 30분전 등
// 직종 페이지로 이동 후 분류 추가 (분류별 컴포넌트)
// 분류내에 업무 내용
// 직종 추가 -> 직종 페이지 이동 -> 직종 페이지 내 분류 추가 -> 분류 컴포넌트 안에 업무 내용 추가

export default WorkManagement;
