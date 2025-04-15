import { Label } from "@/components/ui/label";
import Greetings from "@/components/main/Greetings";
import Logout from "@/components/main/Logout";

const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between h-14 md:h-8 items-center gap-x-4 gap-y-4 bg-[#1D2327] text-white">
        <Label>Simple Task Management</Label>
        <div className="flex items-center h-full">
          <Greetings />
          <Logout />
        </div>
      </header>
    </>
  );
};

export default Header;
