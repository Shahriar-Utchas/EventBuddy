"use client";
import { useEffect, useState } from "react";
import { Eye, Pencil, SquarePen, Trash, Trash2 } from "lucide-react";

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

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data.events))
      .catch((err) => console.error("Failed to fetch events:", err));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    // Replace this with navigation or modal logic
    alert(`Edit event with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] p-10 text-[#2c2560]">
      <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-[#9e95c7] mb-6">
        Manage events, view registrations, and monitor your platform.
      </p>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Events Management</h2>
        <button className="bg-[#5b5efc] text-white px-4 py-2 rounded-md font-medium hover:bg-[#4a4de5] transition">
          Create Event
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#eae9f5] bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#fafafa] text-[#333]">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Registrations</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">
                  {new Date(event.date).toLocaleDateString("en-UK", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4">
                  {event.registered}/{event.totalSeats}
                </td>
                <td className="px-6 py-4">
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
