export default function Button({
    children,
    className = "",
    onClick = null,
    attributes = {},
}) {
    return (
        <>
            <button
                {...attributes}
                onClick={onClick}
                class={`${className} py-[12px] px-[25px] text-[16px] font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-zinc-100 hover:text-black focus:text-current focus:ring-zinc-100 focus:ring-2 flex items-center justify-center gap-2`}
            >
                {children}
            </button>
        </>
    );
}
