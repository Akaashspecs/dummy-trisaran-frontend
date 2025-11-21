// components/WhatsAppShareButton.js
"use client";
import { IoMdShare } from "react-icons/io";
import { loadEncrypted } from "../utils";

const WhatsAppShareButton = ({ productId, bankName, category }) => {
  const user = loadEncrypted("user");

  const shareMessage = `
🎯 ${bankName} ${category} Offer!

Secure your future instantly with a policy from a trusted name. Stop waiting and get covered today—it's fast, secure, and hassle-free.

👉 Apply now through my exclusive link:

https://leads.trisaranmoney.in/?ref=${user.agentCode}&product=${productId}

✨ Quick approval | Secure Process | Expert support
  `.trim(); // Use trim to remove leading/trailing spaces/newlines

  // 3. Combine the message and URL into one string before encoding
  // Note: We use the URL at the end of the text as requested.

  // 4. URL-encode the entire content string (Text + URL)
  // This is CRITICAL to ensure the ampersands (&) and newlines (\n) are correctly handled.
  const encodedContent = encodeURIComponent(shareMessage);

  // 5. Construct the final WhatsApp deep link
  const whatsappLink = `https://wa.me/?text=${encodedContent}`;

  return (
    <a
      className="bg-gray-400 flex items-center justify-center gap-3 rounded-xl mt-3 hover:shadow-xl text-white"
      href={whatsappLink}
      target="_blank" // Opens the link in a new tab/window
      rel="noopener noreferrer" // Security best practice for target="_blank"
      style={{
        padding: "8px 20px",
        fontSize: "20px",
      }}
    >
      Share <IoMdShare />
    </a>
  );
};

export default WhatsAppShareButton;
