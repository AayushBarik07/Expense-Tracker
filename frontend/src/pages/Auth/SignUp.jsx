import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from "../../context/userContext.jsx";

const SignUp = () => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      let strength = 0;

      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[^a-zA-Z0-9]/.test(value)) strength++;

      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      let profileImageUrl = null;

      if (profilePic) {
        const imageData = new FormData();
        imageData.append("image", profilePic);

        const uploadResponse = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        profileImageUrl = uploadResponse?.data?.imageUrl || null;
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          profileImageUrl,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0)
      return isDark ? "bg-[#1B2A1D]" : "bg-[#C6DEC6]";

    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-[#5FD370]";

    return "bg-[#113E02]";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";

    return "Strong";
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-br from-[#113E02] to-[#020402] shadow-[#5FD37020]"
                : "bg-gradient-to-br from-[#5FD370]/20 to-[#C6DEC6] shadow-[#113E0215]"
            }`}
          >
            <svg
              className={`w-9 h-9 ${
                isDark ? "text-[#5FD370]" : "text-[#113E02]"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>

          <h2
            className={`text-4xl font-black mb-3 tracking-tight ${
              isDark
                ? "bg-gradient-to-r from-[#5FD370] via-[#113E02] to-[#072b07] bg-clip-text text-transparent"
                : "bg-gradient-to-r from-[#5c7653] via-[#020402] to-[#113E02] bg-clip-text text-transparent"
            }`}
          >
            Create Account ✨
          </h2>

          <p
            className={`text-sm font-medium ${
              isDark ? "text-[#C6DEC6]/70" : "text-[#113E02]/70"
            }`}
          >
            Start managing your finances smarter & faster
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`rounded-3xl border backdrop-blur-xl p-7 shadow-2xl transition-all duration-300 ${
            isDark
              ? "bg-[#020402]/90 border-[#113E02]"
              : "bg-white/90 border-[#C6DEC6]"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <ProfilePhotoSelector
              image={profilePic}
              setImage={setProfilePic}
            />

            {error && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                  isDark
                    ? "bg-red-500/10 border-red-500/30 text-red-300"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-[#C6DEC6]" : "text-[#113E02]"
                }`}
              >
                Full Name
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className={`w-5 h-5 ${
                      isDark ? "text-[#5FD370]" : "text-[#113E02]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-sm font-medium outline-none transition-all duration-300 ${
                    isDark
                      ? "bg-[#0B130C] border-[#113E02] text-white placeholder:text-[#C6DEC680] focus:border-[#5FD370] focus:ring-4 focus:ring-[#5FD37020]"
                      : "bg-[#F7FBF7] border-[#C6DEC6] text-[#020402] placeholder:text-[#113E0280] focus:border-[#5FD370] focus:ring-4 focus:ring-[#5FD37020]"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-[#C6DEC6]" : "text-[#113E02]"
                }`}
              >
                Email Address
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className={`w-5 h-5 ${
                      isDark ? "text-[#5FD370]" : "text-[#113E02]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-sm font-medium outline-none transition-all duration-300 ${
                    isDark
                      ? "bg-[#0B130C] border-[#113E02] text-white placeholder:text-[#C6DEC680] focus:border-[#5FD370] focus:ring-4 focus:ring-[#5FD37020]"
                      : "bg-[#F7FBF7] border-[#C6DEC6] text-[#020402] placeholder:text-[#113E0280] focus:border-[#5FD370] focus:ring-4 focus:ring-[#5FD37020]"
                  }`}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                className={`text-sm font-semibold ${
                  isDark ? "text-[#C6DEC6]" : "text-[#113E02]"
                }`}
              >
                Password
              </label>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className={`w-5 h-5 ${
                      isDark ? "text-[#5FD370]" : "text-[#113E02]"
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
                  placeholder="Create strong password"
                  className={`w-full pl-12 pr-14 py-4 rounded-2xl border text-sm font-medium outline-none transition-all duration-300 ${
                    isDark
                      ? "bg-[#0B130C] border-[#113E02] text-white placeholder:text-[#C6DEC680] focus:border-[#5FD370] focus:ring-4 focus:ring-[#5FD37020]"
                      : "bg-[#F7FBF7] border-[#C6DEC6] text-[#020402] placeholder:text-[#113E0280] focus:border-[#5FD370] focus:ring-4 focus:ring-[#5FD37020]"
                  }`}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                    isDark
                      ? "text-[#C6DEC6] hover:text-[#5FD370]"
                      : "text-[#113E02] hover:text-[#020402]"
                  }`}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Strength */}
              {formData.password && (
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? getPasswordStrengthColor()
                            : isDark
                            ? "bg-[#1B2A1D]"
                            : "bg-[#DCE9DC]"
                        }`}
                      />
                    ))}
                  </div>

                  <p
                    className={`text-xs font-medium ${
                      isDark ? "text-[#C6DEC6]/70" : "text-[#113E02]/70"
                    }`}
                  >
                    Password Strength:{" "}
                    <span className="font-bold">
                      {getPasswordStrengthText()}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 accent-[#5FD370] cursor-pointer"
                  required
                />

                <span
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-[#C6DEC6]" : "text-[#113E02]"
                  }`}
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-[#5FD370] hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-[#5FD370] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!formData.terms || isLoading}
              className="w-full mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5FD370] via-[#4EB960] to-[#113E02] text-[#020402] py-4 font-bold text-base shadow-xl shadow-[#5FD37040] transition-all duration-300 hover:-translate-y-1 hover:shadow-[#5FD37060] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>

              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                    </svg>

                    Creating account...
                  </>
                ) : (
                  <>
                    Create Free Account
                    <span>→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C6DEC6] to-transparent"></div>

            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-[#C6DEC6]/60" : "text-[#113E02]/60"
              }`}
            >
              Or continue with
            </span>

            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C6DEC6] to-transparent"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`rounded-2xl border py-4 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-[#0B130C] border-[#113E02] hover:border-[#5FD370]"
                  : "bg-[#F7FBF7] border-[#C6DEC6] hover:border-[#5FD370]"
              }`}
            >
              <span className="font-semibold">Google</span>
            </button>

            <button
              className={`rounded-2xl border py-4 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-[#0B130C] border-[#113E02] hover:border-[#5FD370]"
                  : "bg-[#F7FBF7] border-[#C6DEC6] hover:border-[#5FD370]"
              }`}
            >
              <span className="font-semibold">Apple</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center">
            <p
              className={`text-sm ${
                isDark ? "text-[#C6DEC6]/70" : "text-[#113E02]/70"
              }`}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#5FD370] hover:underline underline-offset-4"
              >
                Login here
              </Link>
            </p>

            <p
              className={`mt-4 text-xs ${
                isDark ? "text-[#C6DEC6]/40" : "text-[#113E02]/50"
              }`}
            >
              Secure • Fast • Smart Finance Experience
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;