function WorkDetail({ title, content }: { title: string; content: string }) {
  return (
    <div className="min-h-[200px] w-[280px] rounded border bg-white p-4 shadow">
      <h1 className="mb-4 text-center font-bold">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default WorkDetail;
