import { confirmSignUpAsync, selectAuth } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../redux/appStore";
import "../assets/signIn.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const ConfirmSignUp = () => {
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
      confirmSignUpAsync({
        username: e.target.email.value,
        code: e.target.code.value,
      })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-grey-2)]">
      <div className="ext-sign-in-box shadow-lg p-8 bg-white w-full max-w-md">
        <h2 className="ext-title font-manrope mb-6">Confirm Sign Up</h2>
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
            name="code"
            type="text"
            placeholder="OTP Code"
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-brown)]"
            required
            disabled={loading}
          />
          <button
            type="submit"
            className="ext-button ext-primary w-full py-2 font-bold text-lg"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};
