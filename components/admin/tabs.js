import { Tabs as TabsFL } from "flowbite-react";
import { HiUserCircle, HiAdjustments, HiClipboardList } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const Tabs = () => {
  return (
    <TabsFL.Group aria-label="Tabs with icons" style="underline">
      <TabsFL.Item active={true} title="Profile">Profile content</TabsFL.Item>
      <TabsFL.Item  title="Dashboard">
        Dashboard content
      </TabsFL.Item>
      <TabsFL.Item title="Settings">
        Settings content
      </TabsFL.Item>
      <TabsFL.Item title="Contacts">
        Contacts content
      </TabsFL.Item>
    </TabsFL.Group>
  );
};

export default Tabs;
