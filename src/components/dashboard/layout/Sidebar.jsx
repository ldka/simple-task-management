import Navigation from "./Navigation";

const Sidebar = () => {
  return (
    <aside className="hidden bg-[#1D2327] md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 py-2">
          <Navigation />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
