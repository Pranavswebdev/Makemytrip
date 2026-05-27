import { useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/Button";
import { Wordmark } from "../../components/Wordmark";

export function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email: string })?.email || "your email";

  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
  const [codes, setCodes] = useState(["", "", "", ""]);
  const [showResendToast, setShowResendToast] = useState(false);

  const isComplete = codes.every((code) => code !== "");

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      if (!value) {
        const newCodes = [...codes];
        newCodes[index] = "";
        setCodes(newCodes);
        return;
      }

      if (!/^\d$/.test(value)) return;

      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // Auto-focus to next field
      if (index < 3 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [codes]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newCodes = [...codes];

        if (codes[index]) {
          // If current field has content, clear it
          newCodes[index] = "";
          setCodes(newCodes);
        } else if (index > 0) {
          // If current field is empty, move to previous and clear
          newCodes[index - 1] = "";
          setCodes(newCodes);
          inputRefs.current[index - 1]?.focus();
        }
      }
    },
    [codes]
  );

  const handleContinue = () => {
    const code = codes.join("");
    // Accept any 4-digit code or specific seed code
    if (code.length === 4) {
      navigate("/home");
    }
  };

  const handleResend = () => {
    setShowResendToast(true);
    setTimeout(() => setShowResendToast(false), 2000);
  };

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="screen-scroll flex flex-col gap-8 p-6 pb-24 pt-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Wordmark size={24} />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="mb-3 font-serif text-[32px] font-semibold text-heading">
            Verification Code
          </h1>
          <p className="text-[15px] leading-relaxed text-muted">
            Enter the 4 Digit Verification code that has been sent to your{" "}
            {email}.
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-4">
          {codes.map((code, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              aria-label={`Verification code digit ${index + 1}`}
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="flex h-20 w-20 items-center justify-center rounded-2xl border-[2px] border-accent bg-surface text-center text-[24px] font-semibold text-heading outline-none"
            />
          ))}
        </div>

        {/* Continue Button */}
        <Button disabled={!isComplete} onClick={handleContinue} type="button">
          Continue
        </Button>

        {/* Go Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          type="button"
        >
          Go Back
        </Button>

        {/* Resend Link */}
        <div className="text-center">
          <p className="text-[15px] text-muted">
            Didnt Receive A Code?{" "}
            <button
              onClick={handleResend}
              className="font-semibold text-heading transition-opacity hover:opacity-70"
            >
              Resend
            </button>
          </p>
        </div>

        {/* Toast */}
        {showResendToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg">
            Code resent to {email}
          </div>
        )}
      </div>
    </div>
  );
}
