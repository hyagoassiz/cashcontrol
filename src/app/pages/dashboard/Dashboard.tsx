import { Header } from "../../shared/components/appBar/Header";
import { MenuDrawer } from "../../shared/components/MenuDrawer/MenuDrawer";

export const Dashboard = () => {
  return (
    <div>
      <MenuDrawer>
        <Header />
      </MenuDrawer>
    </div>
  );
};
