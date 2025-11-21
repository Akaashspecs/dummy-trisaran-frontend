"use client";

import { Timestamp } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlinePending } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { TbXboxX } from "react-icons/tb";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { formatReadableDate } from "../../../app/utils";
import { apiDelete, apiGet, apiPost } from "../../lib/api";

export default function BankAccount({ setBankFormOpen, singleProductData }) {
  const [bankAddScreen, setBankAddScreen] = useState(false);
  const [bankData, setBankData] = useState([]);

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
    onSubmit: async (values) => {
      const date = formatReadableDate(new Date());
      const timestamp = Timestamp.fromDate(new Date());
      const uid = localStorage.getItem("uid");

      // const updateData = {
      //   createdAt: timestamp,
      //   customerEmail: values.email,
      //   customerName: values.fullName,
      //   customerPhone: values.mobile,
      //   email: values.email,
      //   fullName: values.fullName,
      //   panCard: values.panNumber,
      //   phone: values.mobile,
      //   pincode: values.pincode,
      //   productCategory: singleProductData.category,
      //   productId: singleProductData.id,
      //   productName: singleProductData.name,
      //   source: "app_application_form",
      //   status: "pending",
      //   updatedAt: timestamp,
      //   userId: uid,
      // };
      console.log("Form Data:", updateData);
      try {
        const response = await apiPost("/api/leads", updateData);
        toast.error;
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const bankAccountStatus = [
    {
      id: "pending",
      title: "Pending",
      iconBg: "bg-orange-400/20",
      icon: <MdOutlinePending />,
      color: "text-orange-400",
    },
    {
      id: "verified",
      title: "Verified",
      iconBg: "bg-green-400/20",
      icon: <IoMdCheckmarkCircleOutline />,
      color: "text-green-400",
    },
    {
      id: "rejected",
      title: "Rejected",
      iconBg: "bg-red-400/20",
      icon: <FaRegCircleXmark />,
      color: "text-red-400",
    },
  ];

  const handleDeleteBankAccount = async (id) => {
    try {
      const res = await apiDelete(`/api/bankAccounts/${id}`);

      setBankFormOpen(false);
      toast.success("Bank account deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("uid");
        const res = await apiGet(`/api/bankAccounts?userId=${userId}`);

        setBankData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    load();
  }, []);

  const BankSchema = Yup.object().shape({
    accountHolderName: Yup.string()
      .required("Account holder name is required")
      .min(3, "Name must be at least 3 characters"),

    accountNumber: Yup.string()
      .required("Account number is required")
      .matches(/^[0-9]{6,20}$/, "Invalid account number"),

    confirmAccountNumber: Yup.string()
      .required("Please confirm account number")
      .oneOf([Yup.ref("accountNumber"), null], "Account numbers must match"),

    ifscCode: Yup.string()
      .required("IFSC code is required")
      .matches(
        /^[A-Z]{4}0[A-Z0-9]{6}$/i,
        "Invalid IFSC code (e.g., HDFC0001234)"
      ),

    bankName: Yup.string()
      .required("Bank name is required")
      .min(3, "Bank name must be at least 3 characters"),
  });

  return (
    <div className="h-screen w-screen bg-black/30 fixed top-0 left-0 z-10 flex justify-center items-center ">
      <div className=" relative min-w-[500px] p-6 bg-[#f7f7f7] shadow-lg rounded-2xl mb-10 min-h-[500px] max-h-[80%] ">
        <TbXboxX
          className="text-2xl text-gray-700 cursor-pointer absolute right-4 top-4"
          onClick={() => setBankFormOpen(false)}
        />
        <h2 className="text-xl font-semibold mb-4 text-center">
          {bankAddScreen ? "Add Bank Account" : "Bank Accounts"}
        </h2>

        {bankAddScreen === false ? (
          <div>
            {bankData.length > 0 ? (
              <div className="flex flex-col gap-3 overflow-y-scroll h-full max-h-[400px] 2xl:max-h-[550px]">
                {bankData.map((item) => (
                  <div
                    className=" border-2 p-3 rounded-2xl border-blue-500/70 "
                    key={item.id}
                  >
                    <div className="flex justify-between">
                      {" "}
                      <div className="flex gap-3 items-center">
                        {" "}
                        <div className="bg-blue-500/20 h-[45px] w-[45px] rounded-lg flex justify-center items-center text-blue-500/70">
                          <RiBankLine className="text-4xl" />
                        </div>{" "}
                        <div>
                          {" "}
                          <div>{item.accountHolderName}</div>{" "}
                          <div>{item.bankName}</div>
                        </div>
                      </div>{" "}
                      <div>
                        {item.isPrimary && (
                          <div className="bg-blue-500/90 text-white font-medium text-[13px] px-3 rounded-xl">
                            PRIMARY
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t mt-3 pt-3">
                      {" "}
                      <div className="flex justify-between">
                        <div className="flex flex-col items-center">
                          <div className="text-[14px] text-gray-700">
                            Account Number
                          </div>
                          <div className="text-[14px] text-gray-700">
                            {item.accountNumber}
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-[14px] text-gray-700">
                            IFSC Code
                          </div>
                          <div className="text-[14px] text-gray-700">
                            {item.ifscCode}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="mt-5 flex justify-between">
                          {bankAccountStatus.map((account) => {
                            if (account.id === item.status) {
                              return (
                                <div
                                  key={account.id}
                                  className={`${account.iconBg} ${account.color} flex w-fit items-center gap-1 px-3 text-[14px] rounded-md`}
                                >
                                  <div>{account.icon}</div>{" "}
                                  <div> {account.title}</div>
                                </div>
                              );
                            } else return null;
                          })}

                          <MdDeleteOutline
                            className="text-xl text-red-500/70 cursor-pointer"
                            onClick={() => handleDeleteBankAccount(item.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>
            ) : (
              <div>
                <div className="border min-h-[150px] flex flex-col justify-center items-center rounded-2xl shadow-lg border-gray-300 mt-4">
                  <RiBankLine className="text-4xl" />

                  <div className="text-[24px] font-medium">
                    No Bank Accounts Added
                  </div>
                  <div className="text-gray-700 text-[14px]">
                    Add a bank account to withdraw your earning
                  </div>
                </div>
              </div>
            )}
            <div
              onClick={() => setBankAddScreen(true)}
              className="text-white bg-blue-500/70 py-2 rounded-lg text-center font-medium mt-5 cursor-pointer hover:bg-blue-500/80"
            >
              + Add Bank Account
            </div>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-scroll 2xl:max-w-[650px]">
            <Formik
              className=""
              initialValues={{
                accountHolderName: "",
                accountNumber: "",
                confirmAccountNumber: "",
                ifscCode: "",
                bankName: "",
              }}
              validationSchema={BankSchema}
              onSubmit={async (values) => {
                console.log("Form Submitted:", values);
                const timestamp = Timestamp.fromDate(new Date());
                const uid = localStorage.getItem("uid");

                const bankData = {
                  accountHolderName: values.accountHolderName,
                  accountNumber: values.accountNumber,
                  bankName: values.bankName,
                  createdAt: timestamp,
                  ifscCode: values.ifscCode,
                  status: "pending",
                  userId: uid,
                };

                try {
                  const response = await apiPost("/api/bankAccounts", bankData);
                  toast.success("Bank account added successfully!");
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form className="flex flex-col gap-4">
                  {/* Account Holder Name */}
                  <div>
                    <label className="font-medium">Account Holder Name</label>
                    <Field
                      name="accountHolderName"
                      className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-sm"
                      placeholder="Enter account holder name"
                    />
                    <ErrorMessage
                      name="accountHolderName"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="font-medium">Account Number</label>
                    <Field
                      name="accountNumber"
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-sm"
                      placeholder="Enter account number"
                    />
                    <ErrorMessage
                      name="accountNumber"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  {/* Confirm Account Number */}
                  <div>
                    <label className="font-medium">
                      Confirm Account Number
                    </label>
                    <Field
                      name="confirmAccountNumber"
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-sm"
                      placeholder="Re-enter account number"
                    />
                    <ErrorMessage
                      name="confirmAccountNumber"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  {/* IFSC Code */}
                  <div>
                    <label className="font-medium">IFSC Code</label>
                    <Field
                      name="ifscCode"
                      className="w-full border rounded-lg px-3 py-2 border-gray-300 uppercase shadow-sm"
                      placeholder="HDFC0001234"
                      onChange={(e) => {
                        setFieldValue("ifscCode", e.target.value.toUpperCase());
                      }}
                    />
                    <ErrorMessage
                      name="ifscCode"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="font-medium">Bank Name</label>
                    <Field
                      name="bankName"
                      className="w-full border rounded-lg px-3 py-2 border-gray-300 shadow-sm"
                      placeholder="Enter bank name"
                    />
                    <ErrorMessage
                      name="bankName"
                      className="text-red-500 text-sm"
                      component="div"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {/*  */}
      </div>
    </div>
  );
}
