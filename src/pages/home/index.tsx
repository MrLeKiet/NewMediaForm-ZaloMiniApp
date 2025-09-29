
import InputBox from "@/components/InputBox";
import SingleSelect from "@/components/SingleSelect";
import { Bell } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import Navbar from "../../components/NavBar";



function HomePage() {
  const [sliderImages, setSliderImages] = useState<{ thumbnail: string, id: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderInterval = useRef<number | null>(null);
  const isSwiping = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef<number>(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/HotNewsHomePage?rowIndex=0&pageSize=5`, {
      headers: {
        "Accept": "application/json",
        "Accept-Language": "2"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const images = (data?.Data?.Data || []).map((item) => ({ thumbnail: item.thumbnail, id: item.id }));
        setSliderImages(images);
      });
  }, []);

  // Auto-slide interval
  useEffect(() => {
    if (sliderImages.length > 1 && !isSwiping.current) {
      sliderInterval.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
      }, 3000);
      return () => {
        if (sliderInterval.current) window.clearInterval(sliderInterval.current);
      };
    }
    return undefined;
  }, [sliderImages, currentIndex]);

  // Canvas swipe handlers
  // Swipe handlers for <img> slider
  const handleImgTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isSwiping.current = true;
    if (sliderInterval.current) window.clearInterval(sliderInterval.current);
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
  };

  return (
    <Page className="bg-white min-h-screen" style={{ paddingBottom: 'calc(20px + var(--navbar-height))' }}>
      <div className="bg-yellow-400 text-white px-4 flex items-center justify-between" style={{ paddingTop: 'var(--safe-top)'}}>
        <div className="text-lg font-bold" style={{ paddingBottom: 'var(--safe-top)' }}>KESC</div>
      </div>
      <div className="flex flex-col gap-4" >
        {sliderImages.length > 0 && (
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
                  className={`absolute left-1/2 top-1/2 w-auto h-auto max-w-full max-h-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
              ))}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {sliderImages.map((img, idx) => (
                  <span key={img.id} className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white px-4 flex flex-col gap-2">
          <input type="text" placeholder="Nhập vị trí muốn tìm việc" className="border rounded px-3 py-2 w-full" />
          <div className="flex gap-2">
            <InputBox
              label=""
              icon={<span className="text-gray-400"></span>}
            >
              <SingleSelect
                options={[
                  { label: "Công nghệ thông tin", value: "it" },
                  { label: "Kinh doanh", value: "business" },
                  { label: "Tiếp thị", value: "marketing" },
                  { label: "Thiết kế", value: "design" },
                ]}
                value={""}
                placeholder="Chọn ngành nghề"
                onChange={() => { }}
              />
            </InputBox>
            <InputBox
              label=""
              icon={<span className="text-gray-400"></span>}
            >
              <SingleSelect
                options={[
                  { label: "Dưới 5 triệu", value: "under_5m" },
                  { label: "5 - 10 triệu", value: "5m_10m" },
                  { label: "10 - 15 triệu", value: "10m_15m" },
                  { label: "Trên 15 triệu", value: "above_15m" },
                ]}
                value={""}
                placeholder="Chọn mức lương"
                onChange={() => { }}
              />
            </InputBox>
          </div>
        </div>
        <HotNewsSection />
        <JobListSection />
        <LaboreSection />
      </div>
      <Navbar />
    </Page>
  );
}

function JobListSection() {
  const [jobs, setJobs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/UrgentJobRecruitment?rowIndex=0&pageSize=5`, {
      headers: {
        "Accept": "application/json",
        "Accept-Language": "2"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data?.Data?.Data || []);
      });
  }, []);

  const handleClick = (job: any) => {
    const id = job.id || job.jodId || job.jobId;
    console.log("JobListSection click, id:", id, job);
    if (id) {
      navigate(`/jobsdetail/${id}`);
    } else {
      alert("Không tìm thấy id công việc!");
    }
  };

  return (
    <div className="px-4 rounded-lg">
      <div className="text-lg font-bold mb-1">VIỆC LÀM MỚI NHẤT</div>
      <div className="flex flex-col gap-2">
        {jobs.map((job) => (
          <button
            key={job.id || job.jodId || job.jobId}
            className="flex gap-3 items-center bg-white/5 rounded p-2 w-full text-left cursor-pointer hover:bg-white/10"
            onClick={() => handleClick(job)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(job);
              }
            }}
            tabIndex={0}
            type="button"
          >
            {job.thumbnail && (
              <img
                src={job.thumbnail}
                alt={job.title}
                className="w-16 h-16 object-cover"
              />
            )}
            <div className="flex-1">
              <div className="font-semibold leading-tight mb-1" style={{ wordBreak: 'break-word' }}>{job.title}</div>
              <div className="text-xs">Khu vực: {job.location || "Chưa cập nhật"}</div>
              <div className="text-xs">Mức lương: {job.salary || "Thỏa thuận"}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LaboreSection() {
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/Labore?rowIndex=0&pageSize=5`, {
      headers: {
        "Accept": "application/json",
        "Accept-Language": "2"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data?.Data?.Data || []);
      });
  }, []);

  return (
    <div className="px-4 rounded-lg">
      <div className="text-lg font-bold mb-1">ỨNG VIÊN MỚI NHẤT</div>
      <div className="flex flex-col gap-2">
        {jobs.map((job) => (
          <div key={job.id} className="flex gap-3 items-center bg-white/5 rounded p-2">
            {job.thumbnail && (
              <img
                src={job.thumbnail}
                alt={job.fullname}
                className="w-16 h-16 object-cover"
              />
            )}
            <div className="flex-1">
              <div className="font-semibold leading-tight mb-1" style={{ wordBreak: 'break-word' }}>{job.fullname}</div>
              <div className="text-xs">
                Ngành nghề: {Array.isArray(job.job) ? job.job.join(", ") : (job.job || "Chưa cập nhật")}
              </div>
              <div className="text-xs">Nơi làm việc: {job.location || "Thỏa thuận"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotNewsSection() {
  const [news, setNews] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/HotNewsHomePage?rowIndex=0&pageSize=5`, {
      headers: {
        "Accept": "application/json",
        "Accept-Language": "2"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setNews(data?.Data?.Data || []);
      });
  }, []);

  function formatDate(dateStr: string) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return dateStr;
  }

  function handleNewsClick(id: string) {
    navigate(`/news/${id}`);
  }

  return (
    <div className="px-4  rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap text-lg font-bold">
          <Bell className="w-5 h-5" />{" "}
          THÔNG BÁO MỚI NHẤT
        </div>
        <button
          className="bg-white text-xs px-3 py-1 font-semibold"
          onClick={() => navigate("/news")}
        >
          Xem tất cả &gt;
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {news.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex gap-3 items-center bg-white/5 rounded p-2 cursor-pointer hover:bg-white/10 w-full text-left"
            onClick={() => handleNewsClick(item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleNewsClick(item.id);
              }
            }}
            tabIndex={0}
          >
            <div className="flex flex-col items-center justify-center min-w-[60px]">
              <div className="bg-[#1565C0] text-white text-xs font-bold rounded px-2 py-1 mb-1 text-center">
                {item.publishdate
                  ? (() => {
                    const parts = formatDate(item.publishdate).split("/");
                    if (parts.length === 3) {
                      return (
                        <>
                          {parts[0]}/{parts[1]}
                          <hr className="my-1 w-full" />
                          <div className="mt-1">{parts[2]}</div>
                        </>
                      );
                    }
                    return "--/--";
                  })()
                  : "--/--"}
              </div>
            </div>
            <div className="flex-1">
              <div
                className="font-semibold leading-tight mb-1"
                style={{
                  wordBreak: 'break-word',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.title}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;