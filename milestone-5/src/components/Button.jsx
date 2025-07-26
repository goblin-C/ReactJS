export default function Button({
  buttonText,
  width,
  height,
  icon,
  isLoading,
  disabled,
  onClick,
  type = "submit",
  fill = true,
  image,
}) {
  return (
    <button
      className={`flex items-center justify-center ${
        disabled
          ? "bg-[#A3CBFA]"
          : fill
          ? "bg-[#4094F7]"
          : "border border-[#D0D5DD]"
      } h-[32px] rounded-[6px] pr-2`}
      style={{ width: width, height: height }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {image && <img src="images/add.svg" alt="add" />}
      {isLoading ? (
        <div className="flex items-center">
          <span className="text-button-text text-[#F6F8F9]">Loading...</span>
        </div>
      ) : (
        <>
          {icon && <img src={icon} alt="" />}
          <span
            className={`text-button-text ${
              fill ? "text-[#F6F8F9]" : "text-[#344054]"
            }`}
          >
            {buttonText}
          </span>
        </>
      )}
    </button>
  );
}
