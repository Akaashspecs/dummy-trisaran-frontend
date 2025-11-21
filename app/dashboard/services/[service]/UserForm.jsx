"use client";

import { Timestamp } from "firebase/firestore";
import { useFormik } from "formik";
import { TbXboxX } from "react-icons/tb";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { formatReadableDate, loadEncrypted } from "../../../../app/utils";
import { apiPost } from "../../../lib/api";

export default function UserForm({ setIsFormOpen, singleProductData }) {
  const user = loadEncrypted("user");
  console.log(user);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      panNumber: "",
      mobile: "",
      email: "",
      pincode: "",
      terms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Full name is required"),
      panNumber: Yup.string()
        .matches(
          /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
          "Invalid PAN format (e.g., ABCDE1234F)"
        )
        .required("PAN number is required"),
      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
        .required("Pincode is required"),
      terms: Yup.boolean().oneOf([true], "You must accept terms & conditions"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const date = formatReadableDate(new Date());
      const timestamp = Timestamp.fromDate(new Date());
      const uid = localStorage.getItem("uid");

      const updateData = {
        createdAt: timestamp,
        customerEmail: values.email,
        customerName: values.fullName,
        customerPhone: values.mobile,
        email: user.email,
        fullName: user.fullName,
        panCard: values.panNumber,
        phone: values.mobile,
        pincode: values.pincode,
        productCategory: singleProductData.category,
        productId: singleProductData.id,
        productName: singleProductData.name,
        source: "app_application_form",
        status: "pending",
        updatedAt: timestamp,
        userId: uid,
      };
      console.log("Form Data:", updateData);
      try {
        const response = await apiPost("/api/leads", updateData);
        resetForm();

        toast.success("Form submitted successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="h-screen w-screen bg-black/30 fixed top-0 left-0 z-10 flex justify-center items-center ">
      <div className=" relative min-w-[500px] p-6 bg-white shadow-lg rounded-2xl mb-10">
        <TbXboxX
          className="text-2xl text-gray-700 cursor-pointer absolute right-4 top-4"
          onClick={() => setIsFormOpen(false)}
        />
        <h2 className="text-xl font-semibold mb-4 text-center">
          User Details Form
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="As per Aadhar Card"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          {/* PAN Number */}
          <div>
            <label className="block mb-1 font-medium">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              maxLength={10}
              placeholder="ABCDE1234F"
              onChange={(e) => {
                const upper = e.target.value.toUpperCase();
                formik.setFieldValue("panNumber", upper);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.panNumber}
              className="w-full border rounded-lg px-3 py-2 uppercase border-gray-300 shadow-md"
            />
            {formik.touched.panNumber && formik.errors.panNumber && (
              <p className="text-red-500 text-sm">{formik.errors.panNumber}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block mb-1 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="As per Aadhar Card"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md"
            />
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="block mb-1 font-medium">Pincode</label>
            <input
              type="text"
              name="pincode"
              maxLength={6}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="400002"
              value={formik.values.pincode}
              className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-md"
            />
            {formik.touched.pincode && formik.errors.pincode && (
              <p className="text-red-500 text-sm">{formik.errors.pincode}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="terms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.terms}
            />
            <label className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <p className="text-red-500 text-sm">{formik.errors.terms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
