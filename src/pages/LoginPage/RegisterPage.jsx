import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '0',
    height: '',
    weight: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      birthday: formData.birthday,
      gender: Number(formData.gender),
      roleId: "661fcf75e40000551e02a001",
      height: Number(formData.height),
      weight: Number(formData.weight),
    };

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5093/api/v1/Auth/register', payload);
      console.log('Register success:', res.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050d1f] via-[#0b1e35] to-[#081930] text-white flex items-center justify-center px-4">
      <div className="bg-[#0a1d37]/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl w-full max-w-md border border-cyan-500/40">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">Create Your Account</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4 font-medium">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />
          <input
            name="birthday"
            type="date"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />

          <div className="flex gap-4">
            <select
              name="gender"
              onChange={handleChange}
              className="w-1/2 px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-400"
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Other</option>
            </select>
            <input
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
            />
          </div>

          <input
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-transparent border border-cyan-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
