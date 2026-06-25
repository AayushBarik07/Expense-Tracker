import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const ForgotPassword = () => {
  const { isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log("Password reset link sent to:", email);
    }, 2000);
  };

  const handleReset = () => {
    setEmail("");
    setIsSubmitted(false);
    setError("");
  };

  return (
    <AuthLayout>
      <div className="relative w-full max-w-md mx-auto">
        {/* Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-accent-green/20 blur-3xl rounded-full"></div>

        {/* Card */}
        <div
          className={`relative overflow-hidden rounded-[32px] border backdrop-blur-2xl shadow-2xl p-8 md:p-10 transition-all duration-300 ${
            "bg-primary-card/90 border-borders"
          }`}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-electric/5 via-transparent to-accent-violet/5 pointer-events-none"></div>

          {/* Header */}
          <div className="relative text-center mb-10">
            <div
              className={`mx-auto mb-6 flex items-center justify-center w-18 h-18 rounded-3xl border shadow-lg backdrop-blur-xl ${
                "bg-secondary-bg border-borders"
              }`}
            >
              <svg
                className="w-8 h-8 text-accent-electric"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>

            <h2
              className={`text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r bg-clip-text text-transparent ${
                "from-accent-cyan via-accent-electric to-accent-violet"
              }`}
            >
              Reset Password
            </h2>

            <p
              className={`text-sm font-medium ${
                "text-secondary-text"
              }`}
            >
              {isSubmitted
                ? "Check your inbox for reset instructions"
                : "Recover your account access securely"}
            </p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 rounded-3xl border border-accent-electric/20 bg-accent-green/10 p-5">
              <div className="flex gap-3">
                <div className="mt-1">
                  <svg
                    className="w-5 h-5 text-accent-electric"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div>
                  <p
                    className={`font-semibold mb-1 ${
                      isDark ? "text-dark-text-secondary" : "text-light-text-primary"
                    }`}
                  >
                    Email sent successfully
                  </p>

                  <p
                    className={`text-sm leading-relaxed ${
                      "text-secondary-text"
                    }`}
                  >
                    We’ve sent a password reset link to{" "}
                    <strong>{email}</strong>. Please check your inbox and follow
                    the instructions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="group">
                <label
                  className={`mb-2 block text-sm font-semibold ${
                    isDark ? "text-dark-text-secondary" : "text-light-text-primary"
                  }`}
                >
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <svg
                      className={`w-5 h-5 transition-colors ${
                        "text-muted-text group-focus-within:text-accent-electric"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={`w-full rounded-2xl border pl-12 pr-4 py-4 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 ${
                      error
                        ? "border-red-500/50 focus:ring-red-500/10"
                        : "focus:ring-accent-electric/50/10"
                    } ${
                      isDark ? "bg-[#0b120b] border-[#1d351d] text-dark-text-primary placeholder:text-[#607060] focus:border-accent-electric" : "bg-[#f8fbf8] border-[#dce7dc] text-light-text-primary placeholder:text-[#7b8d7b] focus:border-accent-electric"
                    }`}
                  />
                </div>

                {error && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {error}
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div
                className={`rounded-2xl border p-4 ${
                  isDark ? "bg-[#0b120b] border-[#1d351d]" : "bg-[#F4F7F2] border-[#dce7dc]"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    "text-secondary-text"
                  }`}
                >
                  We’ll send a secure password reset link to your email
                  address. Make sure to check your spam folder if you don’t see
                  it in your inbox.
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative overflow-hidden w-full rounded-2xl btn-primary bg-primary-gradient border-0 py-4 font-semibold text-white shadow-lg  transition-all duration-300 hover:-translate-y-1  disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-primary-card/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

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

                      Sending Reset Link...
                    </>
                  ) : (
                    <>
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
                        />
                      </svg>

                      Send Reset Link
                    </>
                  )}
                </span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={handleReset}
                className={`w-full rounded-2xl border py-4 font-semibold transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? "bg-[#0b120b] border-[#1d351d] text-dark-text-secondary hover:border-accent-cyan" : "bg-[#f8fbf8] border-[#dce7dc] text-light-text-primary hover:border-accent-cyan-light"
                }`}
              >
                Try Another Email
              </button>

              <Link
                to="/login"
                className="block w-full rounded-2xl btn-primary bg-primary-gradient border-0 py-4 text-center font-semibold text-white shadow-lg  transition-all duration-300 hover:-translate-y-1 "
              >
                Back to Login
              </Link>
            </div>
          )}

          {/* Footer */}
          <div
            className={`mt-10 border-t pt-8 ${
              isDark ? "border-[#1d351d]" : "border-[#dce7dc]"
            }`}
          >
            <p
              className={`text-center text-sm ${
                "text-secondary-text"
              }`}
            >
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-accent-electric hover:text-accent-violet transition-colors"
              >
                Sign up here
              </Link>
            </p>

            <p
              className={`text-center text-sm mt-3 ${
                "text-secondary-text"
              }`}
            >
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-accent-electric hover:text-accent-violet transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;