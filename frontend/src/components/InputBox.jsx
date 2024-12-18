function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <label className="block py-2">{label}</label>
      <input
        className="border p-2 rounded-md w-full"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputBox;
