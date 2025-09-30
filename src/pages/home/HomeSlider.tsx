import Skeleton from "@/components/Skeleton";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHotNews } from "./useHome";

interface SliderImage {
    thumbnail: string;
    id: string;
}


const HomeSlider: React.FC = () => {
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderInterval = useRef<number | null>(null);
    const isSwiping = useRef(false);
    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef<number>(0);

    const { news, loading, error } = useHotNews();

    // Memoize the images array to prevent unnecessary reference changes
    const images = useMemo(() => {
        if (news.length === 0) return [];
        return news.map((item) => ({ thumbnail: item.thumbnail, id: item.id }));
    }, [news]);

    // Update slider images only if images content changes
    useEffect(() => {
        setSliderImages((prev) => {
            const prevIds = prev.map((img) => img.id).join(",");
            const newIds = images.map((img) => img.id).join(",");
            if (prevIds === newIds) return prev; // Avoid re-render if IDs are the same
            return images;
        });
    }, [images]);

    // Auto-slide effect
    useEffect(() => {
        if (sliderImages.length <= 1) return;

        const interval = window.setInterval(() => {
            if (!isSwiping.current) {
                setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
            }
        }, 3000);

        sliderInterval.current = interval;

        return () => {
            if (sliderInterval.current) {
                window.clearInterval(sliderInterval.current);
                sliderInterval.current = null;
            }
        };
    }, [sliderImages.length]);

    // Loading / error states (must be after all hooks)
    if (loading) {
        return (
            <div className="w-full h-40 flex items-center justify-center">
                <Skeleton className="w-full h-40" />
            </div>
        );
    }

    // Swipe handlers
    const handleImgTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        isSwiping.current = true;
        if (sliderInterval.current) {
            window.clearInterval(sliderInterval.current);
            sliderInterval.current = null;
        }
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const handleImgTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current !== null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };

    const handleImgTouchEnd = () => {
        if (Math.abs(touchDeltaX.current) > 50) {
            if (touchDeltaX.current < 0) {
                setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
            }
        }
        touchStartX.current = null;
        touchDeltaX.current = 0;
        isSwiping.current = false;

        // Restart interval after swipe
        if (sliderImages.length > 1) {
            sliderInterval.current = window.setInterval(() => {
                if (!isSwiping.current) {
                    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
                }
            }, 3000);
        }
    };

    // Loading / error states
    if (loading) {
        return <div className="w-full h-48 flex items-center justify-center">Đang tải slider...</div>;
    }

    if (error) {
        let message = "";
        if (typeof error === "string") message = error;
        else if (error instanceof Error) message = error.message;
        else message = "Lỗi không xác định.";
        return <div className="w-full h-48 flex items-center justify-center text-red-500">Lỗi khi tải slider: {message}</div>;
    }

    if (sliderImages.length === 0) return null;

    return (
        <div className="w-full bg-white flex justify-center items-center">
            <div
                className="relative w-full max-w-md h-48 overflow-hidden rounded-lg"
                onTouchStart={handleImgTouchStart}
                onTouchMove={handleImgTouchMove}
                onTouchEnd={handleImgTouchEnd}
            >
                {sliderImages.map((img, idx) => (
                    <img
                        key={img.id}
                        src={img.thumbnail}
                        alt={`Hot News ${idx}`}
                        className={`absolute left-1/2 top-1/2 w-auto h-auto max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    />
                ))}

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {sliderImages.map((img, idx) => (
                        <span
                            key={img.id}
                            className={`w-2 h-2 rounded-full ${idx === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeSlider;