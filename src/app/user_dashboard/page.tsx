'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";
import Swal from "sweetalert2";

type Event = {
  id: number;
  title: string;
  date: string;
  day: string;
  time: string;
  location: string;
};

type UserData = {
  name: string;
  events: Event[];
};

export default function User_Dashboard() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLoading) return; 

    if (!user) {
      router.push('/signin');
      return;
    }

    fetch("/userData.json")
      .then((res) => res.json())
      .then((data: UserData) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load user data:", err);
        setLoading(false);
      });
  }, [user, userLoading, router]);

  const handleCancel = (eventId: number, title: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to cancel your registration for "${title}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!userData) return;
        const updatedEvents = userData.events.filter((e) => e.id !== eventId);
        setUserData({ ...userData, events: updatedEvents });

        Swal.fire(
          'Cancelled!',
          'Your registration has been removed.',
          'success'
        );
      }
    });
  };

  const handleBrowse = () => {
    router.push('/');
  };

  if (userLoading || loading) return <div className="p-8">Loading...</div>;
  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#f9f8ff] px-8 py-6 text-[#2e2e5e]">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-sm mt-1 text-[#7c7c9c]">
        Welcome back, {userData.name}! Here you can manage your event registrations.
      </p>

      <h2 className="text-lg font-semibold mt-8 mb-4">My Registered Events</h2>

      {userData.events.length > 0 ? (
        userData.events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between bg-white rounded-md shadow-sm border p-4 mb-4"
          >
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-xl font-semibold text-[#4d4dbf]">
                  {event.date.split(" ")[0]}
                </p>
                <p className="text-3xl font-bold text-[#2e2e5e]">
                  {event.date.split(" ")[1]}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#2e2e5e]">{event.title}</h3>
                <div className="flex items-center text-sm text-[#7c7c9c] space-x-4 mt-1">
                  <span>📅 {event.day}</span>
                  <span>⏰ {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCancel(event.id, event.title)}
              className="px-4 py-2 text-white font-semibold shadow-md hover:brightness-110 transition rounded-md bg-[linear-gradient(to_bottom,_#ff7a7a_0%,_#ff4c4c_15%,_#ff4c4c_100%)]"
            >
              Cancel registration
            </button>
          </div>
        ))
      ) : (
        <p className="text-[#7c7c9c] text-sm">You have no registered events.</p>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleBrowse}
          className="px-4 py-2 text-white font-semibold shadow-md hover:brightness-110 transition rounded-md bg-[linear-gradient(to_bottom,_#a288ff_0%,_#5773ff_15%,_#5773ff_100%)]"
        >
          Browse more events
        </button>
      </div>
    </div>
  );
}
