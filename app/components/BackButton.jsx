import Link from "next/link";
import { FiArrowLeftCircle } from "react-icons/fi";

const BackButton = ({ url }) => {
  return (
    <Link href={url}>
      <FiArrowLeftCircle className="text-2xl text-gray-700" />
    </Link>
  );
};

export default BackButton;
