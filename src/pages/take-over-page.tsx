import DateSelector from '../components/date-selector';

function TakeOverPage() {
  return (
    <div className="container mx-auto max-w-[1024px]">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-2xl font-bold">인수인계</h2>
      </div>
      <div className="w-full rounded-md border bg-white p-4 shadow">
        <DateSelector />
      </div>
    </div>
  );
}

export default TakeOverPage;
