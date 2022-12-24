type InputProps = {
  placeholder: string;
  className: string;
  onChange?: any;
  onClick?: any;
  type: string;
  value?: string 
};
const Input = ({
  placeholder,
  className,
  onChange,
  onClick,
  type,
}: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={className}
      onClick={onClick}
      type={type}
      onChange={onChange}
    />
  );
};

export default Input;
