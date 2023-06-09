function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          fetch('/api');
        }}
      >
        Click to make api call
      </button>
    </div>
  );
}

export default App;
