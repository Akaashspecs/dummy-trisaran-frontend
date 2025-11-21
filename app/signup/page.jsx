"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { MdOutlineTrendingUp } from "react-icons/md";
import { PiBank } from "react-icons/pi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { apiPost } from "../lib/api";
import { saveEncrypted } from "../utils";

export default function SignupPage() {
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
  const signupSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),

    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit number")
      .required("Phone number is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm your password"),

    referralCode: Yup.string().optional(),
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
          <div className="text-5xl 2xl:text-7xl font-bold">Welcome</div>
          <div className="text-2xl 2xl:text-4xl  text-gray-600">
            Sign in to becoma a trisaran member
          </div>
          <div className="mt-5 flex flex-col gap-8">
            {showData.map((item, i) => (
              <div className="flex gap-3 items-center" key={i}>
                <div className="bg-blue-500/30 rounded-sm h-[45px] w-[45px] text-[35px] flex justify-center items-center text-blue-500/90 ">
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
        <div className="backdrop-blur-xs min-w-[500px] flex flex-col items-center px-6 pt-2 pb-4 2xl:py-13 shadow-2xl border border-gray-300 rounded-2xl">
          <h1 className="text-[20px] 2xl:text-[25px] font-semibold">
            Sign up to your account
          </h1>
          <div className="text-gray-700 text-[14px]">
            Enter your credentials to continue
          </div>

          {/* Formik Form */}
          <Formik
            initialValues={{
              name: "",
              phone: "",
              email: "",
              password: "",
              confirmPassword: "",
              referralCode: "",
            }}
            validationSchema={signupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setMessage("");
              try {
                const response = await apiPost("/api/auth/signup", values);
                // Save token
                toast.success("New User Created Successfully!");
                localStorage.setItem("token", response.refreshToken);
                saveEncrypted("user", response.profile);
                localStorage.setItem("uid", response.uid);
                router.push("/dashboard");
              } catch (error) {
                toast.error(error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2 2xl:gap-4 w-full 2xl:mt-3">
                {/* Full Name */}
                <div className="gap-1 flex flex-col">
                  <label className="text-[14px] text-gray-700">Full Name</label>
                  <Field
                    name="name"
                    className="p-2 w-full bg-white rounded-md shadow-md"
                    placeholder="Your full name"
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs 2xl:text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="gap-1 flex flex-col">
                  <label className="text-[14px] text-gray-700">
                    Phone Number
                  </label>
                  <Field
                    name="phone"
                    className="p-2 w-full bg-white rounded-md shadow-md"
                    placeholder="10-digit number"
                  />

                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-xs 2xl:text-sm"
                  />
                </div>

                {/* Email */}
                <div className="gap-1 flex flex-col">
                  <label className="text-[14px] text-gray-700">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="p-2 w-full bg-white rounded-md shadow-md"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs 2xl:text-sm"
                  />
                </div>

                {/* Password */}
                <div className="gap-1 flex flex-col">
                  <label className="text-[14px] text-gray-700">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="p-2 w-full bg-white rounded-md shadow-md"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs 2xl:text-sm"
                  />
                </div>

                {/* Confirm Password */}
                <div className="gap-1 flex flex-col">
                  <label className="text-[14px] text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="p-2 w-full bg-white rounded-md shadow-md"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs 2xl:text-sm"
                  />
                </div>

                {/* Referral Code (Optional) */}
                <div className="gap-1 flex flex-col">
                  <label className="text-[14px] text-gray-700">
                    Referral Code (Optional)
                  </label>
                  <Field
                    name="referralCode"
                    className="p-2 w-full bg-white rounded-md shadow-md"
                    placeholder="Referral Code"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full font-semibold"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>

                {message && (
                  <p className="text-center text-red-500 mt-2">{message}</p>
                )}
              </Form>
            )}
          </Formik>

          <div className="text-[14px] mt-4 text-gray-700">
            Already have an account?{" "}
            <Link className="text-blue-500/90 font-medium" href={"/login"}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
