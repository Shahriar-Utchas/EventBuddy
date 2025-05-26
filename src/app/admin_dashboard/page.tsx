"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useUser } from "../context/userContext"; // adjust the path as needed

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  registered: number;
  totalSeats: number;
};

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();
  const { user } = useUser(); // ⬅️ Access user from context

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }

    if (user.role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You do not have permission to access the admin dashboard.",
        confirmButtonColor: "#5b5efc",
      }).then(() => {
        router.push("/");
      });
    }
  }, [user, router]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        Swal.fire("Deleted!", "Event has been removed.", "success");
      }
    });
  };

  const handleEdit = (id: string) => {
    Swal.fire({
      title: "Edit Event",
      text: `Edit event with ID: ${id}`,
      icon: "info",
      confirmButtonColor: "#5b5efc",
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] px-4 sm:px-6 lg:px-16 py-10 text-[#2c2560]">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-[#9e95c7] mb-6 text-sm sm:text-base">
        Manage events, view registrations, and monitor your platform.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold">Events Management</h2>
        <button className="w-full sm:w-auto bg-[#5b5efc] text-white px-4 py-2 rounded-md font-medium hover:bg-[#4a4de5] transition">
          Create Event
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm w-full overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="bg-[#fcfcff] text-[#2c2560] border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 font-medium">Title</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Location</th>
              <th className="px-3 py-3 font-medium">Registrations</th>
              <th className="px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-3 py-4">{event.title}</td>
                <td className="px-3 py-4">
                  {new Date(event.date).toLocaleDateString("en-UK", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-3 py-4">{event.location}</td>
                <td className="px-3 py-4">
                  {event.registered}/{event.totalSeats}
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-[#666] hover:text-black cursor-pointer" />
                    <SquarePen
                      className="w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleEdit(event.id)}
                    />
                    <Trash2
                      className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(event.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
