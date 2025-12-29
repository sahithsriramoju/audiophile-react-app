import { useDispatch, useSelector } from "react-redux";
import { signInAsync, selectAuth } from "../redux/authSlice";
import type { AppDispatch } from "../redux/appStore";
import { Link } from "react-router";
import "../assets/signIn.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, step } = useSelector(selectAuth);

  useEffect(() => { 
    // If the step changes to SIGNED_IN, redirect to Dashboard page
    if (step === "SIGNED_IN") {
      navigate("/dashboard");
    }
  }, [step]);
  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      signInAsync({
        username: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-grey-2)]">
      <div className="ext-sign-in-box shadow-lg p-8 bg-white w-full max-w-md">
        <h2 className="ext-title font-manrope mb-6">Sign In</h2>
        {error && (
          <div className="text-red-600 text-center mb-2 font-semibold">{error}</div>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-brown)]"
            required
            disabled={loading}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-brown)]"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="ext-button ext-primary w-full py-2 font-bold text-lg"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-[var(--color-dark-brown)] font-semibold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
