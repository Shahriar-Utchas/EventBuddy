"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import Swal from "sweetalert2";
import { useUser } from "../context/userContext";

const CreateEventPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [tags, setTags] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/signin");
      return;
    }

    if (user.role !== "admin") {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You do not have permission to access this page.",
        confirmButtonColor: "#5b5efc",
      }).then(() => {
        router.push("/");
      });
    }
  }, [user, router, loading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !time || !description || !location || !capacity || !tags) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields before submitting.",
        confirmButtonColor: "#5b5efc",
      });
      return;
    }

    // Prevent unused variable warning for image
    console.log("Selected image file:", image);

    Swal.fire({
      icon: "success",
      title: "Event Updated!",
      text: "Your event has been successfully updated.",
      confirmButtonColor: "#5b5efc",
    }).then(() => {
      router.push("/admin_dashboard");
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2C2470]">Edit Event</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#2C2470] mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
            />
          </div>

          {/* Date & Time */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label className="block text-sm font-medium text-[#2C2470] mb-1">Date</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
              />
              <CalendarDays className="absolute right-3 top-9 text-[#2C2470]" size={18} />
            </div>
            <div className="relative flex-1">
              <label className="block text-sm font-medium text-[#2C2470] mb-1">Time</label>
              <input
                type="text"
                placeholder="e.g. 09:00 AM – 11:00 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
              />
              <Clock className="absolute right-3 top-9 text-[#2C2470]" size={18} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#2C2470] mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-[#2C2470] mb-1">Event Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
            />
          </div>

          {/* Capacity & Tags */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#2C2470] mb-1">Capacity</label>
              <select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
              >
                <option value="">Select</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#2C2470] mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C2470]"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[#2C2470] mb-1">Image (optional)</label>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-[#F4F5FF] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-[#2C2470]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m6-5V8a2 2 0 00-2-2h-3.5a2 2 0 00-1.7-1H9.2a2 2 0 00-1.7 1H4a2 2 0 00-2 2v3"
                  />
                </svg>
              </div>

              <div className="text-sm text-[#2C2470]">
                <p>
                  Drag or{" "}
                  <label className="text-[#2C2470] underline cursor-pointer">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    upload
                  </label>{" "}
                  the picture here
                </p>
                <p className="text-xs text-[#A0A3BD] mt-1">Max. 5MB | JPG, PNG</p>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="ml-auto bg-[#F5F7FF] text-[#2C2470] px-4 py-2 rounded-md border border-[#E0E4FB] text-sm hover:bg-[#e7eafc] transition"
              >
                Browse
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/admin_dashboard")}
              className="text-gray-500 hover:underline transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4D44B5] text-white px-6 py-2 rounded-md hover:bg-[#3a3390] transition font-medium"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
