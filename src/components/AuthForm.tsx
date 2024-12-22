import React, { useState } from 'react';

interface AuthFormProps {
  onSubmit: (email: string, name: string) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, name);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-black">Welcome to SafeCircle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#67DD00] focus:ring focus:ring-[#67DD00] focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#67DD00] focus:ring focus:ring-[#67DD00] focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#67DD00] text-white py-2 px-4 rounded-md hover:bg-[#5ac500] transition-colors"
        >
          Get Started
        </button>
      </form>
    </div>
  );
}