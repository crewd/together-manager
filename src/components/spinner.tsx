function Spinner() {
  return (
    <div
      className="spinner h-[50px] w-[50px] animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
      style={{ animationDuration: '0.4s' }}
    ></div>
  );
}

export default Spinner;
