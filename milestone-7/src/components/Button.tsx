interface ButtonProps {
  buttonText: string;
  width?: string;
  icon?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button';
  className?: string;
}

export default function Button({ 
  buttonText, 
  width, 
  icon, 
  isLoading, 
  disabled,
  onClick,
  type = 'submit',
  className = ''
}: ButtonProps) {
  const baseClasses = `flex items-center justify-center h-12 md:h-13 lg:h-[52px] rounded-full px-6 transition-colors duration-200 ${disabled ? 'bg-[#A3CBFA]' : 'bg-[#111111] hover:bg-gray-800'} ${className}`;
  
  const buttonStyle = width && width !== '100%' ? { width } : {};
  const widthClass = width === '100%' ? 'w-full' : width ? '' : 'w-auto min-w-[136px]';
  
  return (
    <button 
      className={`${baseClasses} ${widthClass}`}
      style={buttonStyle}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm md:text-button-text text-[#F6F8F9]">Loading...</span>
        </div>
      ) : (
        <>
          {icon && <img src={icon} alt="" className="mr-2" />}
          <span className="text-sm md:text-button-text text-[#F6F8F9] font-medium">{buttonText}</span>
        </>
      )}
    </button>
  );
}