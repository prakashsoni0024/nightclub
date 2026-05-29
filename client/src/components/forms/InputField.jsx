const InputField = ({ type = "text", placeholder, name, value, onChange, min }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 transition"
    />
  );
};

export default InputField;
