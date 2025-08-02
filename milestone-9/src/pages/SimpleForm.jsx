import { useState } from "react";

export default function SimpleForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setSubmitted(true);
    window.location.href = "http://localhost:5173/";
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        data-testid="simple-form"
        className="flex flex-col gap-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-10 w-80"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Login</h2>
        <input
          data-testid="input-name"
          name="name"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg outline-none transition"
        />
        <input
          data-testid="input-email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg outline-none transition"
        />
        <input
          data-testid="input-password"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg outline-none transition"
        />
        <button
          data-testid="submit-button"
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Login
        </button>
        {submitted && (
          <p
            data-testid="success-message"
            className="text-green-600 text-center font-semibold"
          >
            Logged in!
          </p>
        )}
      </form>
    </div>
  );
}
