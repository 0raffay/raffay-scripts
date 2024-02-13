export default function Input({
    className = "",
    placeholder = "",
    onInput = null,
    onChange = null,
    label = "",
    labelClass = "",
    type = "text",
    attributes = {},
    children,
    name = "",
    error,
    errorClass,
}) {
    return (
        <>
            {label && label.length && (
                <label
                    className={`${labelClass} text-md mb-2 font-bold font-sans block w-full`}
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {children && children.length && (
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none">
                        {children}
                    </span>
                )}
                <input
                    className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:ring-1 focus:outline-none block w-full p-2.5  ${
                        children && children.length && "ps-[27px]"
                    }`}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onInput={onInput}
                    onChange={onChange}
                    {...attributes}
                />
                {error && (
                    <p
                        className={`absolute bottom-[-19px] text-[12px] font-medium text-[#E32626] ${
                            errorClass ?? ""
                        }`}
                    >
                        {error}
                    </p>
                )}
            </div>
        </>
    );
}
