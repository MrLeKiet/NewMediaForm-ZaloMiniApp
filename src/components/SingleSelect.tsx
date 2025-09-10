import { ChevronDown, Square, SquareCheck, Tally1 } from "lucide-react";
import React from "react";

export type SingleSelectProps = {
    options: { value: string; label: string }[];
    value: string;
    onChange: (selected: string) => void;
    placeholder?: string;
};

const SingleSelect: React.FC<SingleSelectProps> = ({
    options,
    value,
    onChange,
    placeholder,
}) => {
    const [open, setOpen] = React.useState(false);
    const [internal, setInternal] = React.useState(value || "");
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        setInternal(value || "");
    }, [value]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSelect = (option: string) => {
        setInternal(option);
    };

    const handleConfirm = () => {
        onChange(internal);
        setOpen(false);
    };

    return (
        <>
            {/* Trigger button */}
            <button
                type="button"
                className={`w-full flex items-center justify-between px-1 py-1 border-transparent text-base font-medium transition focus:outline-none `}
                onClick={handleOpen}
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpen();
                    }
                }}
            >
                <span className={value ? "" : "text-gray-400"}>
                    {value ? options.find((o) => o.value === value)?.label : placeholder}
                </span>
                <span className="ml-2 flex items-center text-gray-400">
                    <Tally1 size={18} />
                    <ChevronDown size={18} />
                </span>
            </button>

            {/* Overlay */}
            <button
                type="button"
                aria-label="Đóng menu lựa chọn"
                tabIndex={open ? 0 : -1}
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleClose}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClose();
                    }
                }}
                style={{ border: "none", padding: 0, margin: 0 }}
            />

            {/* Bottom sheet */}
            <div
                className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"
                    }`}
            >
                <div className="bg-white rounded-t-2xl shadow-lg p-4 max-h-[55vh] justify-between flex flex-col">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Chọn một lựa chọn</span>
                            <button onClick={handleClose} className="text-2xl leading-none">
                                &times;
                            </button>
                        </div>

                        {/* Search input */}
                        <input
                            type="text"
                            className="w-full mb-3 px-3 py-2 border border-transparent rounded focus:outline-none focus:ring"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Options list */}
                        <ul className="space-y-1 overflow-y-auto h-[25vh]">
                            {options
                                .filter((option) =>
                                    option.label.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((option) => {
                                    const isSelected = internal === option.value;
                                    return (
                                        <button
                                            type="button"
                                            key={option.value}
                                            className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected
                                                    ? "text-blue-600 font-semibold bg-blue-50"
                                                    : "cursor-pointer hover:bg-gray-100"
                                                }`}
                                            onClick={() => handleSelect(option.value)}
                                            tabIndex={0}
                                        >
                                            <span className="flex-1">{option.label}</span>
                                            {isSelected ? (
                                                <SquareCheck
                                                    size={20}
                                                    className="text-blue-600 ml-2"
                                                />
                                            ) : (
                                                <Square size={20} className="text-gray-400 ml-2" />
                                            )}
                                        </button>
                                    );
                                })}
                        </ul>
                    </div>

                    {/* Confirm button */}
                    <button
                        className="bg-blue-600 hover:bg-blue-700 rounded-md h-12 px-6 text-sm text-white transition w-full mt-4 py-2"
                        onClick={handleConfirm}
                        disabled={!internal}
                        type="button"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </>
    );
};

export default SingleSelect;
