import Link from "next/link";
import { Button } from "@/components/ui/button";

const AddButton = ({ href, label }) => {
  return (
    <Button
      size="md"
      variant="outline"
      className="text-[13px] text-link hover:text-link border-link bg-blue-500 text-green-50 shadow hover:bg-blue-600"
    >
      <Link href={href} className="w-fit">
        <div className="flex justify-start">{label}</div>
      </Link>
    </Button>
  );
};

export default AddButton;
