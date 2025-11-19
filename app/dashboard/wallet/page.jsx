"use client";

import { useEffect, useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { GoFile } from "react-icons/go";
import { MdOutlineTrendingUp } from "react-icons/md";
import { RiBankLine, RiWallet3Line } from "react-icons/ri";
import { formatRelativeDate } from "../../../app/utils";
import { apiGet } from "../../lib/api";
import BankAccount from "../profile/BankAccount";
import WithDrawScreen from "./WithDrawScreen";

const Wallet = () => {
  const [userTransactionData, setUserTransactionData] = useState(null);
  const [bankFormOpen, setBankFormOpen] = useState(false);
  const [withdrawalFormOpen, setWithdrawalFormOpen] = useState(false);

  const uiData = [
    {
      type: "credit",
      bgColor: "bg-green-500/20",
      textColor: "text-green-500",
      icon: <FiPlusCircle />,
      text: "+",
    },
    {
      type: "withdrawal",
      bgColor: "bg-red-500/20",
      textColor: "text-red-500",
      icon: <FiMinusCircle />,
      text: "-",
    },
  ];

  useEffect(() => {
    async function load() {
      try {
        const userId = localStorage.getItem("uid");
        const res = await apiGet(`/api/transactions?userId=${userId}`);

        console.log(res.data);
        setUserTransactionData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    load();
  }, []);

  if (!userTransactionData) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }
  return (
    <div className="bg-white shadow-md p-6 rounded-t-2xl h-full overflow-y-scroll">
      {withdrawalFormOpen && (
        <WithDrawScreen
          userTransactionData={userTransactionData}
          setWithdrawalFormOpen={setWithdrawalFormOpen}
        />
      )}
      {bankFormOpen && <BankAccount setBankFormOpen={setBankFormOpen} />}

      <div className="font-semibold text-[20px] mb-10">My Wallet</div>
      {/* balance section*/}
      <div className="flex gap-5">
        <div className="border border-gray-200  py-5 px-10 rounded-xl shadow-lg w-full mx-auto">
          <div className="flex flex-col items-center justify-center ">
            <div className=" font-semibold text-2xl">Available Balance</div>
            <div className="text-[25px] text-green-500/50 font-stretch-semi-condensed  font-semibold">
              Rs{" "}
              {userTransactionData.user?.totalEarnings -
                userTransactionData.user?.withdrawnAmount}
            </div>
          </div>
          <div className="flex w-full justify-between mt-7 px-[10%]">
            <div className="flex flex-col items-center">
              <MdOutlineTrendingUp className="text-green-500/50 text-2xl" />
              <div className="text-gray-500">Total Earned</div>
              <div>Rs {userTransactionData.user?.totalEarnings}</div>
            </div>
            <div className="flex flex-col items-center">
              <RiWallet3Line className="text-green-500/50 text-2xl" />
              <div className="text-gray-500">Withdrawn</div>
              <div>Rs {userTransactionData.user?.withdrawnAmount}</div>
            </div>
          </div>
        </div>
        <div className="w-[234px] shrink-0 flex gap-3 flex-col  justify-start items-start ">
          <div
            onClick={() => setBankFormOpen(true)}
            className="bg-blue-500  border w-full flex items-center gap-3 px-3 py-4 rounded-xl text-white mx-auto  hover:bg-linear-to-r from-blue-500 to-blue-600 cursor-pointer hover:text-white"
          >
            <RiBankLine /> Manage Bank Accounts
          </div>
          <div
            onClick={() => setWithdrawalFormOpen(true)}
            className="bg-blue-500  border w-full justify-center flex items-center gap-3 px-3 py-4 rounded-xl text-white mx-auto  hover:bg-linear-to-r from-blue-500 to-blue-600 cursor-pointer hover:text-white"
          >
            <RiBankLine /> Withdrawl
          </div>
        </div>
      </div>

      <div className="  max-h-full min-h-[500px] flex flex-col   bg-gray-100 mt-10 p-6 rounded-xl">
        <div className="font-semibold text-[20px] mb-10">
          {" "}
          Transaction History
        </div>

        {userTransactionData.transactions.length > 0 ? (
          <div className="overflow-x-auto max-h-[500px] h-full grow  overflow-y-scroll  flex flex-col gap-4">
            {userTransactionData.transactions.map((tx) => (
              <div
                key={tx.id}
                className="border border-gray-300 shadow-md h-full px-3 py-2 rounded-lg bg-white  flex justify-between"
              >
                {uiData.map((data, i) => {
                  if (data.type === tx.type) {
                    return (
                      <div key={i} className="w-full">
                        <div className="flex gap-3 ">
                          <div
                            className={` ${data.bgColor} ${data.textColor} text-[40px] flex justify-center items-center h-[50px] w-[50px] rounded-md`}
                          >
                            {data.icon}{" "}
                          </div>
                          <div className="flex w-full justify-between items-center">
                            <div>
                              <div>{tx.description}</div>
                              <div className="text-[14px] text-gray-500">
                                {" "}
                                {tx.timestamp
                                  ? formatRelativeDate(tx.timestamp)
                                  : ""}
                              </div>
                            </div>

                            <div
                              className={`${data.textColor} font-semibold text-lg`}
                            >
                              {" "}
                              {data.text}
                              {tx.amount}.00{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  } else return null;
                })}

                <div></div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" h-100% grow flex justify-center items-center">
            <div className=" flex flex-col justify-center items-center w-fit mb-10 text-gray-500">
              <GoFile className="text-8xl text-gray-300" />
              No Transactions yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
