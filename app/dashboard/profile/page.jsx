"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegIdCard } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { GoShieldCheck } from "react-icons/go";
import {
  IoIosInformationCircleOutline,
  IoMdCheckmarkCircleOutline,
  IoMdShare,
} from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import {
  MdHelpOutline,
  MdOutlineAccountBalanceWallet,
  MdOutlinePending,
} from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { loadEncrypted } from "../../../app/utils";
import BankAccount from "./BankAccount";
import KycForm from "./KycForm";
import PrivacyPolicy from "./PrivacyPolicy";
import SupportChat from "./SupportTicket";

export default function ServicePage() {
  const router = useRouter();
  const [privacyPageOpen, setPrivacyPageOpen] = useState(false);
  const [kycFormOpen, setKycFormOpen] = useState(false);
  const [bankFormOpen, setBankFormOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [ticketTabClosed, setTicketTabClosed] = useState(false);
  const storedUser = loadEncrypted("user");

  console.log(storedUser);
  const handleTabsFunction = (id) => {
    if (id === "privacy_policy") {
      setPrivacyPageOpen(!privacyPageOpen);
    }
    if (id === "bank_accounts") {
      setBankFormOpen(!bankFormOpen);
    }
    if (id === "help") {
      router.push("/dashboard/profile/ticket");
    }
  };

  const tabs = [
    {
      id: "referrals",
      title: "My Referrals",
      desc: "Track your referrals and earnings",
      logo: <LuUsers />,
    },
    {
      id: "id_card",
      title: "My  ID Card",
      desc: "View and share you ID card",
      logo: <FaRegIdCard />,
    },
    // {
    //   id: "email",
    //   title: "Verify Email",
    //   desc: "Complete your email verification",
    //   logo: <CiMail />,
    // },
    {
      id: "bank_accounts",
      title: "Bank Accounts",
      desc: "Manage your bank accounts ",
      logo: <RiBankLine />,
    },
    // {
    //   id: "mpin_security",
    //   title: "MPIN Security",
    //   desc: "Set up or change your MPIN",
    //   logo: <MdLockOutline />,
    // },
    {
      id: "help",
      title: "Help & Support",
      desc: "Get Help and contact us",
      logo: <MdHelpOutline />,
    },
    {
      id: "privacy_policy",
      title: "Privary Policy",
      desc: "Read our Privacy policy",
      logo: <GoShieldCheck />,
    },
  ];

  const kycStatus = [
    {
      id: "not_submitted",
      title: "KYC Not Started",
      description: "Verify your identity to unlock all features",
      iconBg: "bg-gray-400/20",
      darkBgColor: "bg-gray-400",
      icon: <IoIosInformationCircleOutline />,
      color: "text-gray-400",
    },
    {
      id: "pending",
      title: "KYC Pending",
      description: "Your documents are under review",
      iconBg: "bg-orange-400/20",
      darkBgColor: "bg-orange-400",
      icon: <MdOutlinePending />,
      color: "text-orange-400",
    },
    {
      id: "approved",
      title: "KYC Approved",
      description: "Your account is fully verified",
      iconBg: "bg-green-400/20",
      darkBgColor: "bg-green-400",
      icon: <IoMdCheckmarkCircleOutline />,
      color: "text-green-400",
    },
    {
      id: "rejected",
      title: "KYC Rejected",
      description: "",
      iconBg: "bg-red-400/20",
      darkBgColor: "bg-red-400",
      icon: <FaRegCircleXmark />,
      color: "text-red-400",
    },
  ];
  return (
    <div className="h-full bg-white shadow-sm overflow-y-scroll">
      {privacyPageOpen && (
        <PrivacyPolicy setPrivacyPageOpen={setPrivacyPageOpen} />
      )}
      {ticketTabClosed && (
        <SupportChat setTicketTabClosed={setTicketTabClosed} />
      )}
      {kycFormOpen && (
        <AnimatePresence>
          {" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <KycForm setKycFormOpen={setKycFormOpen} />{" "}
          </motion.div>
        </AnimatePresence>
      )}
      {/*  */}
      {bankFormOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {" "}
            <BankAccount setBankFormOpen={setBankFormOpen} />{" "}
          </motion.div>
        </AnimatePresence>
      )}
      <div className="font-semibold text-[20px] pl-6 pt-6 ">Profile</div>
      <div className=" p-6 rounded-2xl flex flex-col gap-24 ">
        <div className="border overflow-hidden border-gray-300 shadow-md rounded-2xl h-[300px] flex justify-around items-center ">
          <div className=" bg-blue-500/30 h-full flex-1 flex flex-col text-white font-medium   w-full  justify-center items-center  text-center">
            <div className="flex items-center flex-col bg-blue-500/70 w-[150px] p-2 rounded-t-lg">
              <MdOutlineAccountBalanceWallet className="text-[24px]" />
              <div className="text-[20px] font-bold">
                ₹ {storedUser.totalEarnings}
              </div>
              <div className="text-[14px] font-medium">Total Earnings</div>
            </div>

            {storedUser.kycStatus === "approved" && (
              <div className="flex items-center flex-col bg-blue-500/70 w-[150px] p-2 rounded-b-lg">
                <IoMdShare className="text-[24px]" />
                <div className="text-[20px] font-bold">
                  {storedUser.agentCode}
                </div>
                <div className="text-[14px] font-medium">Agent Code</div>
              </div>
            )}
          </div>
          <div className="bg-gray-500/30 grow h-full flex-1 flex gap-4  flex-col  justify-center items-center  px-10">
            <div className=" border border-gray-300 shadow-2xl rounded-full">
              <img
                className="h-[180px] w-[180px] object-cover rounded-full border-4 border-white"
                src={`data:image/png;base64,${storedUser?.profileImageBase64}`}
              />
            </div>
            <div className="flex justify-center flex-col items-center">
              <div className="text-2xl font-medium">{storedUser?.name}</div>

              <div className=" text-gray-500 text-[14px] font-medium">
                {storedUser?.email}
              </div>
            </div>
          </div>

          {kycStatus.map((item) => {
            if (storedUser?.kycStatus && item.id === storedUser?.kycStatus) {
              return (
                <div
                  className={`${item.iconBg} w-full flex-1 h-full`}
                  key={item.id}
                >
                  <div className={`w-full p-3 rounded-lg`}>
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <div
                        className={`${item.color} text-[130px] flex items-center justify-center rounded-sm h-[150px] w-[150px]`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex items-center flex-col ">
                        <div className={`${item.color}  text-2xl font-medium`}>
                          {item.title}
                        </div>
                        <div className="text-[14px] text-gray-600">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    {item.id === "not_submitted" && (
                      <div
                        onClick={() => setKycFormOpen(true)}
                        className="bg-gray-400 text-white font-medium text-[18px] text-center py-1 rounded-md mt-2 hover:shadow-md cursor-pointer "
                      >
                        Update Your Kyc
                      </div>
                    )}
                    {item.id === "rejected" && (
                      <div
                        onClick={() => setKycFormOpen(true)}
                        className="bg-red-400 text-white font-medium text-[18px] text-center py-1 rounded-md mt-2 hover:shadow-md cursor-pointer "
                      >
                        Resubmit Kyc
                      </div>
                    )}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-24">
          {tabs.map((item) => (
            <div
              onClick={() => handleTabsFunction(item.id)}
              key={item.title}
              className="flex border items-center w-full  px-2 py-2 rounded-lg gap-2 border-gray-200 shadow-md cursor-pointer hover:bg-gray-50"
            >
              <div className="shrink-0 h-[65px] w-[65px] bg-blue-500/20 rounded-md text-4xl flex justify-center items-center text-blue-600/50">
                {item.logo}
              </div>
              <div>
                <div className="text-[20px] font-medium">{item.title}</div>
                <div className="text-[14px] text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
