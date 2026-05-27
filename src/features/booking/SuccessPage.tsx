import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { CheckCircle2 } from "lucide-react";

export function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-bg p-6 text-center">
      <div className="mb-6">
        <CheckCircle2 size={64} className="mx-auto text-accent" />
      </div>
      <h1 className="mb-3 font-serif text-[28px] font-semibold text-heading">
        Booking Confirmed!
      </h1>
      <p className="mb-8 text-[15px] text-muted">
        Your booking has been confirmed. A confirmation email has been sent to your registered
        email address.
      </p>

      <div className="mb-8 space-y-2 text-[13px] text-muted">
        <p>📅 Check-in: Tomorrow</p>
        <p>📅 Check-out: 2 nights</p>
        <p>💰 Total: Rs 15,000</p>
      </div>

      <Button onClick={() => navigate("/home")}>Back to Home</Button>
    </div>
  );
}
