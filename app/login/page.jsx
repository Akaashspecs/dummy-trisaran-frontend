"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { MdOutlineTrendingUp } from "react-icons/md";
import { PiBank } from "react-icons/pi";
import * as Yup from "yup";
import { apiPost } from "../lib/api";
import { saveEncrypted } from "../utils";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const showData = [
    {
      icon: <PiBank />,
      title: "Trusted Banking Partnerships",
      desc: "Collaborate with leading banks to build credibility",
    },
    {
      icon: <MdOutlineTrendingUp />,
      title: "High Payouts for Our Partners",
      desc: "Enjoy higher returns with clear, transparent payout structures",
    },
    {
      icon: <BiSupport />,
      title: "Dedicated Guidance & Support",
      desc: "We understand your unique goals and guide you toward sustainable success.",
    },
  ];
  // Yup Validation
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters")
      .required("Password is required"),
  });

  return (
    <div
      className="flex h-screen w-screen bg-[#F7F7F7] backdrop:"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, #ffffff, #ccc 0px, transparent 0.6px, transparent 30px), 
          repeating-linear-gradient(90deg, #ffffff, #ccc 0px, transparent 0.6px, transparent 30px)
        `,
        backgroundSize: "30px",
      }}
    >
      {/* Left Section */}
      <div className="w-1/2 flex justify-center items-center ">
        <div>
          <div className="text-5xl 2xl:text-7xl font-bold">Welcome Back</div>
          <div className="text-2xl 2xl:text-4xl  text-gray-600">
            Sign in to manage your marketing campaigns
          </div>
          <div className="mt-5 flex flex-col gap-8">
            {showData.map((item, i) => (
              <div className="flex gap-3 items-center" key={i}>
                <div className="bg-blue-500/30 rounded-sm h-[45px] w-[45px] flex justify-center items-center text-blue-500/90 text-[35px]">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-[16px] 2xltext-[20px]">
                    {item.title}
                  </div>
                  <div className=" text-[15px] 2xl:text-[16px] text-gray-600">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="backdrop-blur-xs min-w-[500px] flex flex-col items-center px-6 py-13 shadow-2xl border border-gray-300 rounded-2xl">
          <h1 className="text-[25px] font-semibold">Sign in to your account</h1>
          <div className="text-gray-700 text-[14px]">
            Enter your credentials to continue
          </div>
          {/* Formik Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setMessage("");
              try {
                const response = await apiPost("/api/auth/login", values);
                // Save token
                console.log(response);
                localStorage.setItem("token", response.refreshToken);
                saveEncrypted("user", response.profile);
                localStorage.setItem("uid", response.uid);
                router.push("/dashboard");
              } catch (error) {
                setMessage(error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4 w-full mt-16">
                {/* Email */}
                <label className="text-[14px] text-gray-700">Email</label>
                <Field
                  className="p-2 w-full bg-white rounded-md shadow-md"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* Password */}
                <label className="text-[14px] text-gray-700">Password</label>
                <Field
                  className="p-2 w-full bg-white rounded-md shadow-md focus:border-blue-400 focus:"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
                {/* 
                <div className="text-[13px] text-end mt-2 text-blue-600 font-medium cursor-pointer">
                  Forget password?
                </div> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
                >
                  {isSubmitting ? "Logging in..." : "Sign in"}
                </button>

                {/* Server Error */}
                {message && (
                  <p className="text-center text-red-500">{message}</p>
                )}
              </Form>
            )}
          </Formik>
          <div className="text-[14px] mt-4 text-gray-700">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-500/90 font-medium" href={"/signup"}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
