import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Wordmark } from "../../components/Wordmark";
import { OrDivider } from "../../components/Divider";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Mock seed credentials
const SEED_EMAIL = "demo@jiva.com";
const SEED_PASSWORD = "password123";

export function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError("");

    // Mock authentication
    if (
      data.email === SEED_EMAIL &&
      data.password === SEED_PASSWORD
    ) {
      navigate("/home");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="screen-scroll flex flex-col gap-8 p-6 pb-24 pt-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Wordmark size={24} />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="mb-3 font-serif text-[32px] font-semibold text-heading">
            Log In
          </h1>
          <p className="text-[15px] leading-relaxed text-muted">
            Enter to a Jiva Space Account to start discover a bunch of Live
            Spaces waiting for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field
            label="Your Email"
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Field
            label="Your Password"
            type="password"
            placeholder="123@!#"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Forget Password Link */}
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="w-full text-left text-[15px] text-muted transition-opacity hover:opacity-70"
          >
            Forget Password
          </button>

          {/* Login Error */}
          {loginError && (
            <div className="rounded-lg bg-accent bg-opacity-20 px-4 py-3 text-[14px] text-accent">
              {loginError}
            </div>
          )}

          {/* Login Button */}
          <Button disabled={!isValid} type="submit">
            Login
          </Button>
        </form>

        {/* Divider */}
        <OrDivider />

        {/* Social Buttons */}
        <div className="space-y-3">
          <Button variant="outline">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#1F2937" />
              <path
                d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM7.5 10C7.5 8.62 8.62 7.5 10 7.5C11.38 7.5 12.5 8.62 12.5 10C12.5 11.38 11.38 12.5 10 12.5C8.62 12.5 7.5 11.38 7.5 10Z"
                fill="white"
              />
              <path
                d="M13.3 6.1C13.67 6.1 13.97 5.8 13.97 5.43C13.97 5.06 13.67 4.76 13.3 4.76C12.93 4.76 12.63 5.06 12.63 5.43C12.63 5.8 12.93 6.1 13.3 6.1Z"
                fill="white"
              />
            </svg>
            Log In With Google
          </Button>

          <Button variant="outline">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.3-.6-.3-1.487c0-1.393.808-2.434 1.81-2.434.853 0 1.265.64 1.265 1.408 0 .857-.546 2.139-.826 3.324-.235.994.5 1.807 1.48 1.807 1.777 0 3.14-1.874 3.14-4.569 0-2.39-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 0 1 .07.288l-.114.658c-.04.196-.129.242-.297.147-1.645-.812-2.684-3.375-2.684-5.432 0-3.16 2.296-6.061 6.614-6.061 3.477 0 6.173 2.479 6.173 5.783 0 3.452-2.173 6.223-5.193 6.223-1.016 0-1.97-.528-2.294-1.15l-.625 2.388c-.224.861-.828 1.94-1.237 2.6.93.286 1.914.44 2.956.44 5.523 0 10-4.477 10-10S15.523 0 10 0z" />
            </svg>
            Log In With Apple
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-[15px] text-muted">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-semibold text-heading transition-opacity hover:opacity-70"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
