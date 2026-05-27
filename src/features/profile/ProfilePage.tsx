import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { getUser } from "../../data/mockApi";
import type { User } from "../../data/types";

export function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex h-full items-center justify-center bg-bg text-muted">
        Loading...
      </div>
    );

  return (
    <div className="flex h-full flex-col bg-bg pb-24">
      <div className="border-b border-line bg-bg px-6 py-6">
        <h1 className="font-serif text-[28px] font-semibold text-heading">
          Profile
        </h1>
      </div>

      <div className="screen-scroll space-y-6 p-6">
        {user && (
          <>
            <div className="space-y-4 rounded-xl border border-line bg-surface p-6">
              <div>
                <div className="text-[12px] text-muted">Name</div>
                <div className="mt-1 text-[15px] text-heading">{user.name}</div>
              </div>
              <div>
                <div className="text-[12px] text-muted">Email</div>
                <div className="mt-1 text-[15px] text-heading">{user.email}</div>
              </div>
              <div>
                <div className="text-[12px] text-muted">Phone</div>
                <div className="mt-1 text-[15px] text-heading">{user.phone}</div>
              </div>
              <div>
                <div className="text-[12px] text-muted">Address</div>
                <div className="mt-1 text-[15px] text-heading">{user.address}</div>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" disabled>
                Edit Profile
              </Button>
              <Button variant="outline" disabled>
                My Bookings
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
