import { TbXboxX } from "react-icons/tb";

const PrivacyPolicy = ({ setPrivacyPageOpen }) => {
  const privacyPolicyText = [
    {
      id: 1,
      heading: "Information We Collect",
      desc: "We may collect the folowing information from you to provide our services efficiently:",
      list: [
        "Personal Information: Name, date of birth, gender, address, phone number, email ID, etc.",
        "KYC Documents: Aadhaar, PAN, Voter ID, Driving License, Passport, etc.",
        "Financial Information: Bank account details, income proof, credit score, business details (for MSME), etc.",
        "Usage Data: Device information, IP address, location, browsing activity, etc.",
      ],
    },
    {
      id: 2,
      heading: "How We Use Your Information",
      desc: "We use your data for the following purposes:",
      list: [
        "To process your application for Credit Card, Instant Loan, Personal Loan, Business Loan, Home Loan, Loan Against Property, Education Loan, Auto Loan, Savining Accounts, Demat Accounts, Micro Loan, Group Loan, Private Funding and more.",
        "To verify your identity and assess financial eligibility",
        "To provide customer support and transaction updates",
        "To send relevant notifications, offers, and service alerts",
        "To improve user experience, analytics, and service efficiency",
        "To comply with regulatory and legal obligations",
      ],
    },
    {
      id: 3,
      heading: " Data Sharing & Third Parties",
      desc: "Your data may be shared securely with:",
      list: [
        "Partner Banks/NBFCs for loan processing",
        "Credit Bureaus for credit verification",
        "Technology & analytics service providers",
        "Government or regulatory bodies, when legally required",
      ],

      note: " We do not sell or trade your personal data with third parties.",
    },
    {
      id: 4,
      heading: "Data Security",
      desc: "We take strict security measures to protect your data, including:",
      list: [
        "SSL encryption during data transfer",
        "Secured cloud storage and firewalls",
        "Role-based access controls to limit data exposure",
      ],
      desc2:
        "While we strive for complete protection, users are advised to safeguard their login credentials and personal devices.",
    },
    {
      id: 5,
      heading: "Your Rights",
      desc: "You have the right to:",
      list: [
        "Access and update your personal information",
        "Opt out of marketing communications",
        "Request deletion of your data (subject to legal constraints)",
      ],
      desc2: "To exercise your rights, contact us at: contact@trisaranmoney.in",
    },
    {
      id: 6,
      heading: "Cookies and Tracking",
      desc: "We use cookies and similar technologies to enhance user experience, measure performance, and offer relevant content. You can manage cookie preferences in your browser settings.",
    },
    {
      id: 7,
      heading: " Policy Updates",
      desc: "This policy may be updated from time to time. Changes will be posted on our official website. Please review it periodically to stay informed.",
    },
    {
      id: 8,
      heading: " Contact Us",
      desc: "For any privacy-related queries, feel free to reach us:",
      list: [
        "Email: contact@trisaranmoney.in",
        "Address: Anjanvel Bouddhwadi, RGPPL Anjanvel, Guhagar, Ratnagiri, Maharashtra 415634",
      ],
    },
  ];

  return (
    <div className="h-scree w-screen bg-black/30 absolute h-screen top-0 left-0 z-10 flex justify-center items-center ">
      <div className="bg-red-50 rounded-2xl overflow-hidden mb-10">
        <div className=" max-w-[600px]  p-6 bg-white shadow-lg rounded-2xl  max-h-[500px] overflow-y-scroll overflow-hidden">
          <div className="flex w-full justify-between">
            <h3 className="text-xl font-semibold">Privacy Policy</h3>
            <TbXboxX
              className="text-2xl text-gray-700 cursor-pointer"
              onClick={() => setPrivacyPageOpen(false)}
            />
          </div>

          <div className="text-[14px] text-gray-700 mt-4">
            At Trisaran Money, we deeply value your trust and are committed to
            protecting your personal and financial information. This Privacy
            Policy explains how we collect, use, store, and safeguard your data
            when you use our services.
          </div>
          <div className="flex flex-col gap-4 mt-5">
            {privacyPolicyText.map((item) => (
              <div key={item.id}>
                <div className="flex gap-2 text-[15px] font-semibold">
                  {item.id} <h4>{item.heading}</h4>
                </div>
                <div className="text-[14px] text-gray-700 mt-3">
                  {item.desc}
                </div>
                <div className="mb-1">
                  {item.list &&
                    item.list.map((text, i) => (
                      <div
                        key={i}
                        className="ml-2 text-[14px] text-gray-700 mt-1 flex gap-2"
                      >
                        {" "}
                        <div> ➜ </div>
                        {text}
                      </div>
                    ))}
                </div>
                {item.desc2 && <div className="text-[14px]">{item.desc}</div>}
                {item.note && (
                  <div className="font-semibold flex gap-2 text-[14px]">
                    <div className=" ">Note:-</div>
                    {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-blue-500/20 text-blue-500 p-3 text-[14px] rounded-xl mt-3">
            Your privacy is our commitment. At Trisaran Money, we ensure your
            data stays secure, and your trust remains unshaken.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
