'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/userContext'; 

interface User {
  email: string;
  password: string;
  name: string;
  role: string;
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const { setUser } = useUser(); 

  useEffect(() => {
    fetch('/authData.json')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
      .catch(err => console.error('Failed to load users:', err));
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setUser({
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      });

      if (foundUser.role === 'admin') {
        router.push('/admin_dashboard');
      } else {
        router.push('/user_dashboard');
      }
    } else {
      const usersInfo = users
        .map(user => `Email: ${user.email}\nPassword: ${user.password}`)
        .join('\n\n');

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        html: `
          <p>Invalid email or password.</p>
          <hr />
          <p>Demo users:</p>
          <pre style="text-align:left; white-space: pre-wrap;">${usersInfo}</pre>
        `,
        confirmButtonColor: '#ff4c4c',
        width: 400,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0ff]">
      <div className="bg-white p-8 rounded-[16px] shadow-lg relative w-full max-w-sm">
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#f0f0ff] rotate-45 translate-x-[-50%] translate-y-[-50%]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#f0f0ff] rotate-45 translate-x-[50%] translate-y-[50%]" />

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign in</h2>
        <p className="text-sm text-gray-600 mb-4">
          New User?{' '}
          <a href="signup" className="text-violet-700 underline hover:text-violet-900">
            Create an account
          </a>
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-800 mb-1">Email</label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 mb-1">Password</label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-semibold shadow-md hover:brightness-110 transition rounded-md bg-[linear-gradient(to_bottom,_#a288ff_0%,_#5773ff_15%,_#5773ff_100%)]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
