import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ChevronLeft } from "lucide-react";

export function ChooseDatePage() {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleContinue = () => {
    if (checkIn && checkOut) {
      navigate("/booking/payment");
    }
  };

  const isValid = checkIn && checkOut && new Date(checkIn) < new Date(checkOut);

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="border-b border-line bg-bg px-4 py-3">
        <button aria-label="Go back" onClick={() => navigate(-1)} className="text-heading">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="screen-scroll space-y-6 p-6 pb-24">
        <h1 className="font-serif text-[28px] font-semibold text-heading">
          Choose Date
        </h1>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="check-in"
              className="mb-2 block text-[15px] font-medium text-heading"
            >
              Check In
            </label>
            <input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-accent bg-surface px-4 py-3 text-[15px] text-heading outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="check-out"
              className="mb-2 block text-[15px] font-medium text-heading"
            >
              Check Out
            </label>
            <input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-accent bg-surface px-4 py-3 text-[15px] text-heading outline-none"
            />
          </div>
        </div>

        <Button disabled={!isValid} onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
