function LoadingDialog() {
  return (
    <section className="absolute z-50 bg-slate-300 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 border-2 rounded-full animate-spin border-rose-500 border-t-blue-400"></div>
        <span>Loading, please wait</span>
      </div>
    </section>
  );
}

export default LoadingDialog;
