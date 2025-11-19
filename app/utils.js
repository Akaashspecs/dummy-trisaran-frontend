import CryptoJS from "crypto-js";

export const saveEncrypted = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    process.env.NEXT_PUBLIC_SECRETKEY
  ).toString();
  localStorage.setItem(key, encrypted);
};

// Read
export const loadEncrypted = (key) => {
  if (typeof window === "undefined") return null; // ⛔ SSR protection

  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;

  const bytes = CryptoJS.AES.decrypt(
    encrypted,
    process.env.NEXT_PUBLIC_SECRETKEY
  );
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export function convertFirestoreTimestamp(timestamp) {
  if (!timestamp?._seconds) return null;

  const milliseconds =
    timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1_000_000);

  const date = new Date(milliseconds);

  const formattedDate = date.toLocaleDateString("en-IN"); // DD/MM/YYYY
  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return { date: formattedDate, time: formattedTime };
}

export function formatReadableDate(dateInput) {
  const date = new Date(dateInput);

  // Date part
  const datePart = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Time part (with AM/PM)
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Timezone offset
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");

  return `${datePart} at ${timePart} UTC${sign}${hours}:${minutes}`;
}

export function timeAgo(timestamp) {
  if (!timestamp?._seconds) return "";

  const date = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6
  );
  const now = new Date();

  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export const formatRelativeDate = (timestamp) => {
  if (!timestamp?._seconds) return "";

  const date = new Date(timestamp._seconds * 1000);
  const now = new Date();

  // Convert to start of day (ignore time)
  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = d2 - d1;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Today / Yesterday / 2 days ago
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 30) return `${diffDays} days ago`;

  // Months
  const diffMonths =
    (d2.getFullYear() - d1.getFullYear()) * 12 +
    (d2.getMonth() - d1.getMonth());

  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;

  // Years
  const diffYears = d2.getFullYear() - d1.getFullYear();

  if (diffYears === 1) return "1 year ago";

  return `${diffYears} years ago`;
};
