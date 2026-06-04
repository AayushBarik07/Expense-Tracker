import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/userContext.jsx";

const Login = () => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="relative w-full max-w-md mx-auto">
        {/* Background Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#5FD370]/20 blur-3xl rounded-full"></div>

        {/* Main Card */}
        <div
          className={`relative overflow-hidden rounded-[32px] border backdrop-blur-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 ${
            isDark
              ? "bg-[#020402]/90 border-[#1f3a1f]"
              : "bg-white/90 border-[#d7e6d7]"
          }`}
        >
          {/* Decorative Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-[#5FD370]/5 via-transparent to-[#113E02]/10 pointer-events-none"></div>

          {/* Header */}
          <div className="relative text-center mb-10">
            <div
              className={`mx-auto mb-6 flex items-center justify-center w-18 h-18 rounded-3xl border shadow-lg backdrop-blur-xl ${
                isDark
                  ? "bg-[#113E02]/60 border-[#2e5a2e]"
                  : "bg-[#F4F7F2] border-[#dbe8db]"
              }`}
            >
              <svg
                className="w-8 h-8 text-[#5FD370]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h2
              className={`text-4xl font-bold tracking-tight mb-3 bg-linear-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-[#C6DEC6] via-[#5FD370] to-[#C6DEC6]"
                  : "from-[#113E02] via-[#2f7a2f] to-[#113E02]"
              }`}
            >
              Welcome Back
            </h2>

            <p
              className={`text-sm font-medium ${
                isDark ? "text-[#9eb39e]" : "text-[#5d6d5d]"
              }`}
            >
              Sign in to continue managing your finances
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group">
              <label
                className={`mb-2 block text-sm font-semibold ${
                  isDark ? "text-[#C6DEC6]" : "text-[#113E02]"
                }`}
              >
                Email Address
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <svg
                    className={`w-5 h-5 transition-colors ${
                      isDark
                        ? "text-[#6e836e] group-focus-within:text-[#5FD370]"
                        : "text-[#6e836e] group-focus-within:text-[#113E02]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={`w-full rounded-2xl border pl-12 pr-4 py-4 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDark
                      ? "bg-[#0b120b] border-[#1d351d] text-white placeholder:text-[#607060] focus:border-[#5FD370] focus:ring-[#5FD370]/10"
                      : "bg-[#f8fbf8] border-[#dce7dc] text-[#113E02] placeholder:text-[#7b8d7b] focus:border-[#5FD370] focus:ring-[#5FD370]/10"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`block text-sm font-semibold ${
                    isDark ? "text-[#C6DEC6]" : "text-[#113E02]"
                  }`}
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#5FD370] hover:text-[#7ee08a] transition-colors"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <svg
                    className={`w-5 h-5 transition-colors ${
                      isDark
                        ? "text-[#6e836e] group-focus-within:text-[#5FD370]"
                        : "text-[#6e836e] group-focus-within:text-[#113E02]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`w-full rounded-2xl border pl-12 pr-14 py-4 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDark
                      ? "bg-[#0b120b] border-[#1d351d] text-white placeholder:text-[#607060] focus:border-[#5FD370] focus:ring-[#5FD370]/10"
                      : "bg-[#f8fbf8] border-[#dce7dc] text-[#113E02] placeholder:text-[#7b8d7b] focus:border-[#5FD370] focus:ring-[#5FD370]/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark
                      ? "text-[#6e836e] hover:text-[#C6DEC6]"
                      : "text-[#6e836e] hover:text-[#113E02]"
                  }`}
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5
                        c4.478 0 8.268 2.943 9.542 7-1.274
                        4.057-5.064 7-9.542 7-4.477
                        0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-[#5FD370] bg-transparent text-[#5FD370] focus:ring-[#5FD370]"
                />

                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-[#9eb39e]" : "text-[#4f5f4f]"
                  }`}
                >
                  Keep me signed in
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative overflow-hidden w-full rounded-2xl bg-linear-to-r from-[#113E02] via-[#1d5b1d] to-[#5FD370] py-4 font-semibold text-white shadow-lg shadow-[#5FD370]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[#5FD370]/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>

                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373
                        0 0 5.373 0 12h4z"
                      ></path>
                    </svg>

                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In

                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#5FD370]/20 to-transparent"></div>

            <span
              className={`text-xs uppercase tracking-[0.2em] ${
                isDark ? "text-[#6e836e]" : "text-[#7b8d7b]"
              }`}
            >
              Or Continue With
            </span>

            <div className="flex-1 h-px bg-linear-to-r from-transparent via-[#5FD370]/20 to-transparent"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`rounded-2xl border py-4 px-4 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-[#0b120b] border-[#1d351d] text-white hover:border-[#5FD370]"
                  : "bg-[#f8fbf8] border-[#dce7dc] text-[#5d6d5d] hover:border-[#5FD370]"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="font-medium">Google</span>
              </div>
            </button>

            <button
              className={`rounded-2xl border py-4 px-4 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-[#0b120b] border-[#1d351d] text-white hover:border-[#5FD370]"
                  : "bg-[#f8fbf8] border-[#dce7dc] text-[#5d6d5d] hover:border-[#5FD370]"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="font-medium">Apple</span>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p
              className={`text-sm ${
                isDark ? "text-[#9eb39e]" : "text-[#5d6d5d]"
              }`}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#5FD370] hover:text-[#7ee08a] transition-colors"
              >
                Create Account
              </Link>
            </p>

            <p
              className={`mt-4 text-xs ${
                isDark ? "text-[#607060]" : "text-[#8a9a8a]"
              }`}
            >
              By signing in, you agree to our{" "}
              <a href="#" className="text-[#5FD370] hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#5FD370] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;