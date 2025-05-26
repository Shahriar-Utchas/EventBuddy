'use client';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0ff]">
      <div className="bg-white p-8 rounded-[16px] shadow-lg relative w-full max-w-sm">
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f0f0ff] rotate-45 translate-x-[-50%] translate-y-[-50%]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f0f0ff] rotate-45 translate-x-[50%] translate-y-[50%]" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign up</h2>
        <p className="text-sm text-gray-600 mb-4">
          Already Have an account?{' '}
          <a href="signin" className="text-violet-700 underline hover:text-violet-900">
            Sign in
          </a>
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-800 mb-1">Name</label>
            <input
              type="text"
              placeholder="e.g John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-800 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-semibold shadow-md hover:brightness-110 transition rounded-md bg-[linear-gradient(to_bottom,_#a288ff_0%,_#5773ff_15%,_#5773ff_100%)]">
              Sign up
            </button> 
        </form>
      </div>
    </div>
  );
}
