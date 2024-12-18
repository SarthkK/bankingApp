function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-slate-900 border-none rounded-lg w-full text-white py-2 my-5 hover:bg-slate-800"
    >
      {label}
    </button>
  );
}

export default Button;
