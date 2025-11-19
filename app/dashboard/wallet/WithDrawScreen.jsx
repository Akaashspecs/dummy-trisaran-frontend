import { useEffect, useState } from "react";
import { TbXboxX } from "react-icons/tb";
import { toast } from "react-toastify";
import { loadEncrypted } from "../../../app/utils";
import { apiGet, apiPost } from "../../lib/api";

const WithDrawScreen = ({ userTransactionData, setWithdrawalFormOpen }) => {
  const [bankData, setBankData] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");
  const user = loadEncrypted("user");
  console.log("USER DATA:", user);
  console.log(userTransactionData);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // find selected bank object
    const selectedAccount = bankData.find((acc) => acc.id === selectedId);

    if (!selectedAccount) {
      toast.error("Please select a bank account");
      return;
    }

    if (!amount) {
      toast.error("Enter amount");
      return;
    }
    const userId = localStorage.getItem("uid");
    // Final object you want to send
    const payload = {
      amount: Number(amount),
      bankAccountId: selectedAccount.id,
      bankDetails: {
        accountHolderName: selectedAccount.accountHolderName,
        accountNumber: selectedAccount.accountNumber,
        bankName: selectedAccount.bankName,

        ifscCode: selectedAccount.ifscCode,
      },
      userId: userId,
      userName: user.name,
      userPhone: user.phone,
    };

    try {
      const response = await apiPost("/api/withdrawl/create", payload);

      toast.success("Form submitted successfully!");
      setSelectedId("");
      setAmount("");
    } catch (error) {
      toast.error(error.message);
    }

    console.log("SUBMITTED DATA:", payload);

    // you can now send payload to backend
  };

  return (
    <div className="h-screen w-screen bg-black/30 fixed top-0 left-0 z-10 flex justify-center items-center ">
      <div className=" relative min-w-[500px] p-6 bg-[#f7f7f7] shadow-lg rounded-2xl mb-10 min-h-[500px] max-h-[80%] ">
        <TbXboxX
          onClick={() => setWithdrawalFormOpen(false)}
          className="text-2xl text-gray-700 cursor-pointer absolute right-4 top-4"
        />
        <div>
          <div className="text-2xl font-medium">Withdraw Money</div>
          <div className="text-gray-600">
            Aviailable :{" "}
            {userTransactionData.user.totalEarnings -
              userTransactionData.user.withdrawnAmount}
          </div>
          {bankData.length > 0 ? (
            <>
              {" "}
              <form onSubmit={handleSubmit} className="p-4  space-y-4">
                {/* Dropdown */}
                <div className="space-y-3 border rounded-lg p-3 border-gray-400">
                  <div className="font-medium">Select Bank</div>
                  {bankData.map((acc) => (
                    <label
                      key={acc.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer
              ${
                selectedId === acc.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }
            `}
                    >
                      <input
                        type="radio"
                        name="bank"
                        value={acc.id}
                        checked={selectedId === acc.id}
                        onChange={() => setSelectedId(acc.id)}
                        className="h-4 w-4"
                      />

                      <div>
                        <p className="font-semibold">{acc.bankName}</p>
                        <p className="text-sm text-gray-600">
                          A/c: {acc.accountNumber}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Amount Input */}
                <input
                  type="number"
                  placeholder="Enter Amount"
                  className="border p-2 rounded w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </form>
            </>
          ) : (
            <div className="flex w-full text-2xl bg-gray-300 rounded-lg justify-between py-14">
              No Back Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithDrawScreen;
