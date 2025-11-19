"use client";

import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GoFile } from "react-icons/go";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";
import BackButton from "../../../components/BackButton";
import WhatsAppShareButton from "../../../components/ShareButton";
import { apiGet } from "../../../lib/api";
import UserForm from "./UserForm";

export default function ServiceDetail({ params }) {
  const { service } = use(params);
  const serviceData = service.replace(/_/g, " ");
  const [openIndex, setOpenIndex] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const pathname = usePathname(); // "/dashboard/services/insurance"
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);
  const [singleProductData, setSingleProductData] = useState(null);

  useEffect(() => {
    const category = pathname.split("/").filter(Boolean).pop(); // "insurance"
    async function load() {
      try {
        const res = await apiGet(`/api/products?category=${category}`);
        console.log(res.data);
        setProductData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlForm = (id) => {
    setIsFormOpen(true);
    const selelectedProduct = productData.find((item) => item.id === id);

    setSingleProductData(selelectedProduct);
  };

  const data = [
    {
      id: 1,
      img: "/sbi.png",
      service: "credit-card",
      bank_name: "HDFC Bank",
      features: ["Zero Fee", "Instant Approval"],
      desc: "Extensice range of Credit Cards with varying credit limits",
      joining_fee: "400",
      renewal_fee: "Free",
      interest: "",
      loanAmount: "",
      detail: [
        "CashBack on spens made",
        "Exclusive reward points on purchases",
        "Welcome benefite",
      ],
    },
    {
      id: 2,
      img: "/axis-max.avif",
      service: "credit-card",
      bank_name: "HDFC Bank",
      features: ["Zero Fee", "Instant Approval"],
      desc: "Extensice range of Credit Cards with varying credit limits",
      joining_fee: "400",
      renewal_fee: "Free",
      interest: "",
      loanAmount: "",
      detail: [
        "CashBack on spens made",
        "Exclusive reward points on purchases",
        "Welcome benefite",
      ],
    },
    {
      id: 3,
      img: "/axis-max.avif",
      service: "credit-card",
      bank_name: "HDFC Bank",
      features: ["Zero Fee", "Instant Approval"],
      desc: "Extensice range of Credit Cards with varying credit limits",
      joining_fee: "400",
      renewal_fee: "Free",
      interest: "",
      loanAmount: "",
      detail: [
        "CashBack on spens made",
        "Exclusive reward points on purchases",
        "Welcome benefite",
      ],
    },
    {
      id: 4,
      img: "/axis-max.avif",
      service: "credit-card",
      bank_name: "HDFC Bank",
      features: ["Zero Fee", "Instant Approval"],
      desc: "Extensice range of Credit Cards with varying credit limits",
      joining_fee: "400",
      renewal_fee: "Free",
      interest: "",
      loanAmount: "",
      detail: [
        "CashBack on spens made",
        "Exclusive reward points on purchases",
        "Welcome benefite",
      ],
    },
    {
      id: 5,
      img: "/axis-max.avif",
      service: "credit-card",
      bank_name: "HDFC Bank",
      features: ["Zero Fee", "Instant Approval"],
      desc: "Extensice range of Credit Cards with varying credit limits",
      joining_fee: "400",
      renewal_fee: "Free",
      interest: "",
      loanAmount: "",
      detail: [
        "CashBack on spens made",
        "Exclusive reward points on purchases",
        "Welcome benefite",
      ],
    },
    {
      id: 6,
      img: "/axis-max.avif",
      service: "credit-card",
      bank_name: "HDFC Bank",
      features: ["Zero Fee", "Instant Approval"],
      desc: "Extensice range of Credit Cards with varying credit limits",
      joining_fee: "400",
      renewal_fee: "Free",
      interest: "",
      loanAmount: "",
      detail: [
        "CashBack on spens made",
        "Exclusive reward points on purchases",
        "Welcome benefite",
      ],
    },
  ];

  return (
    <div className="relative select-none p-6  h-full w-full   shadow-sm rounded-2xl bg-white">
      {isFormOpen && singleProductData !== null && (
        <UserForm
          setIsFormOpen={setIsFormOpen}
          singleProductData={singleProductData}
        />
      )}
      <BackButton url="/dashboard/services" />
      <h3 className="text-2xl font-bold  capitalize text-center">
        {" "}
        Explore {serviceData}
      </h3>
      <div className="w-full text-center text-gray-800 text-[14px]">
        Choose the perfect card and aply instantly!
      </div>
      <div className="mt-10 max-h-full overflow-y-auto mb-10 ">
        <div className="flex flex-col h-full gap-7">
          {productData.length > 0 ? (
            <div className="flex flex-col h-full  gap-7">
              {productData.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-2xl p-7 border-gray-300 shadow-lg bg-white"
                >
                  <div className="flex w-full justify-between">
                    <div className="flex gap-4">
                      <div className="h-[90px] w-[160px] border overflow-hidden rounded-xl">
                        <img
                          src={item.imageUrl}
                          alt="product"
                          className="object-cover h-full w-full
                        "
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-xl text-gray-800">
                          {item.name}
                        </div>
                        {/* {item.benefits && (
                        <div className="flex gap-3 mt-3">
                          {item.benefits.map((feature, i) => (
                            <div
                              className="border border-green-500 text-green-500 rounded-sm bg-green-500/10 px-2 text-[12px]"
                              key={i}
                            >
                              {feature}
                            </div>
                          ))}
                        </div>
                      )} */}
                        <div className="text-gray-600 text-[15px] flex flex-wrap pr-5">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="w-[193px] shrink-0 ">
                      {" "}
                      <div
                        onClick={() => handlForm(item.id)}
                        className="cursor-pointer h-fit px-10 py-2 text-white rounded-2xl shadow-lg text-2xl bg-linear-to-l from-blue-600 to-sky-500 "
                      >
                        Apply Now
                      </div>
                      {item.id && (
                        <WhatsAppShareButton
                          productId={item.id}
                          bankName={item.name}
                          category={item.category}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-6 my-5">
                    {item.joiningFee && (
                      <div className=" bg-blue-500/20 p-2 min-w-[150px] rounded-xl border border-blue-400/80 text-blue-500/80">
                        <div className="flex items-center gap-2 text-[14px]">
                          {" "}
                          <CiCreditCard1 className="text-xl " />{" "}
                          <span className="text-gray-500 font-semibold">
                            Joining Fee
                          </span>
                        </div>
                        <div className="font-semibold">{item.joiningFee}</div>
                      </div>
                    )}

                    {item.renewalFee && (
                      <div className=" bg-green-500/10 p-2 min-w-[150px] rounded-xl border border-green-400/80 text-green-500/80">
                        <div className="flex items-center gap-2 text-[14px]">
                          {" "}
                          <CiCreditCard1 className="text-xl" />{" "}
                          <span className="text-gray-500 font-semibold">
                            Renewal Fee
                          </span>
                        </div>
                        <div className="font-semibold">{item.renewalFee}</div>
                      </div>
                    )}
                  </div>
                  <div className="  border-t-2 border-gray-300/50">
                    {" "}
                    <div
                      onClick={() => toggleAccordion(item.id)}
                      className=" cursor-pointer flex items-center gap-2 bg-gray-200 w-fit mt-3 px-2 py-1 rounded-md"
                    >
                      {" "}
                      View detail{" "}
                      <span>
                        {openIndex === item.id ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </span>
                    </div>
                    {openIndex === item.id && (
                      <div className="mt-4">
                        {item.features && item.features.length > 0 && (
                          <div>
                            <div className="mb-3 text-[20px] font-semibold">
                              Key Features
                            </div>
                            <div className=" transition duration-1000 flex flex-col gap-2 ">
                              {item.features.map((list, i) => (
                                <div
                                  key={i}
                                  className="transition duration-1000 flex items-center gap-1"
                                >
                                  <div className="h-[18px] w-[18px] rounded-full bg-green-300/40 flex justify-center items-center text-green-500/60">
                                    <IoMdCheckmarkCircle />
                                  </div>
                                  <span className="text-[14px] text-gray-700">
                                    {list}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.eligibility && item.eligibility.length > 0 && (
                          <div>
                            <div className="mb-3 mt-7 text-[20px] font-semibold">
                              Eligibility
                            </div>
                            <div className=" transition duration-1000 flex flex-col gap-2 ">
                              {item.eligibility.map((list, i) => (
                                <div
                                  key={i}
                                  className="transition duration-1000 flex items-center gap-1"
                                >
                                  <div className="h-[18px] w-[18px] rounded-full bg-blue-300/40 flex justify-center items-center text-[13px] text-blue-500/60">
                                    <IoShieldCheckmark />
                                  </div>
                                  <span className="text-[14px] text-gray-700">
                                    {list}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="h-[130px]"></div>
            </div>
          ) : (
            <div className=" h-100% grow flex justify-center items-center ">
              <div className=" flex flex-col justify-center items-center w-fit my-24 text-gray-500">
                <GoFile className="text-8xl text-gray-300" />
                No Services yet
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
