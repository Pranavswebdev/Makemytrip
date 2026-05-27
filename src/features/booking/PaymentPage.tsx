import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { ChevronLeft, CreditCard, Smartphone, Wallet } from "lucide-react";

const PAYMENT_METHODS = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI", icon: Smartphone },
  { id: "wallet", name: "Digital Wallet", icon: Wallet },
];

export function PaymentPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("card");

  const handlePayment = () => {
    navigate("/booking/success");
  };

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="border-b border-line bg-bg px-4 py-3">
        <button aria-label="Go back" onClick={() => navigate(-1)} className="text-heading">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="screen-scroll space-y-6 p-6 pb-24">
        <h1 className="font-serif text-[28px] font-semibold text-heading">
          Payment Method
        </h1>

        <div className="space-y-3">
          {PAYMENT_METHODS.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelected(id)}
              className={`flex items-center gap-4 rounded-xl border-[1.5px] p-4 transition-all ${
                selected === id
                  ? "border-accent bg-accent bg-opacity-10"
                  : "border-line bg-surface"
              }`}
            >
              <Icon size={24} className={selected === id ? "text-accent" : "text-muted"} />
              <span className={selected === id ? "text-heading" : "text-muted"}>
                {name}
              </span>
            </button>
          ))}
        </div>

        <Button onClick={handlePayment}>Complete Payment</Button>
      </div>
    </div>
  );
}
