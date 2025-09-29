
import { ChevronDown, Square, SquareCheck, Tally1 } from "lucide-react";
import React from "react";

export type OptionType = {
    label: string;
    value: string;
};

export type MultiSelectProps = {
    options: OptionType[];
    value: string[];
    onChange: (selected: string[]) => void;
    max?: number;
    placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
    options,
    value,
    onChange,
    max = 2,
    placeholder,
}) => {
    const [open, setOpen] = React.useState(false);
    const [internal, setInternal] = React.useState<string[]>(value || []); // committed
    const [pendingInternal, setPendingInternal] = React.useState<string[]>(value || []); // temporary while modal open
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        setInternal(value || []);
        if (!open) setPendingInternal(value || []);
    }, [value]);

    const handleOpen = () => {
        setPendingInternal(internal);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSelect = (optionValue: string) => {
        let next: string[];
        if (pendingInternal.includes(optionValue)) {
            next = pendingInternal.filter((v) => v !== optionValue);
        } else if (pendingInternal.length < max) {
            next = [...pendingInternal, optionValue];
        } else {
            next = pendingInternal;
        }
        setPendingInternal(next);
    };

    const handleConfirm = () => {
        setInternal(pendingInternal);
        onChange(pendingInternal);
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className="w-full input-wrapper border-transparent flex items-center justify-between"
                style={{ paddingLeft: "4px", paddingRight: "0" }}
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
                <span className={internal.length === 0 ? "text-gray-400" : ""}>
                    {internal.length === 0
                        ? placeholder
                        : options
                            .filter((opt) => internal.includes(opt.value))
                            .map((opt) => opt.label)
                            .join(", ")}
                </span>
                <span className="ml-2 flex items-center text-gray-400">
                    <Tally1 size={18} />
                    <ChevronDown size={18} />
                </span>
            </button>

            <button
                type="button"
                aria-label="Đóng bộ chọn"
                tabIndex={open ? 0 : -1}
                className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={handleClose}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleClose();
                    }
                }}
                style={{ cursor: "pointer" }}
            />

            <div
                className={`fixed left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="bg-white rounded-t-2xl shadow-lg p-4 h-[60vh] flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">
                            Chọn ngành nghề (tối đa {max})
                        </span>
                        <button onClick={handleClose} className="text-2xl leading-none">
                            &times;
                        </button>
                    </div>

                    <input
                        type="text"
                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                        placeholder="Tìm kiếm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <ul className="space-y-1 overflow-y-auto flex-1">
                        {options
                            .filter((option) =>
                                option.label.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((option) => {
                                const isSelected = pendingInternal.includes(option.value);
                                const isDisabled = !isSelected && pendingInternal.length >= max;

                                return (
                                    <button
                                        type="button"
                                        key={option.value}
                                        className={`w-full text-left py-3 px-2 rounded flex items-center justify-between gap-4 transition-colors ${isSelected
                                            ? "text-blue-600 font-semibold bg-blue-50"
                                            : "hover:bg-gray-100"
                                            } ${isDisabled
                                                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                                        onClick={() => !isDisabled && handleSelect(option.value)}
                                        disabled={isDisabled}
                                    >
                                        <span className="flex-1">{option.label}</span>
                                        {isSelected ? (
                                            <SquareCheck size={20} className="text-blue-600 ml-2" />
                                        ) : (
                                            <Square size={20} className="text-gray-400 ml-2" />
                                        )}
                                    </button>
                                );
                            })}
                    </ul>

                    <button
                        className="btn-blue w-full mt-4 py-2"
                        onClick={handleConfirm}
                        disabled={pendingInternal.length === 0}
                        type="button"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </>
    );
};

export default MultiSelect;
