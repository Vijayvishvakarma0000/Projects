import { useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileInfo from "../components/ProfileInfo";
import AddressManager from "../components/AddressManager";
import OrderHistory from "../components/OrderHistory";
import WishlistManager from "../components/WishlistManager";
import Settings from "../components/Settings";
import Pro from "./Profile.module.css";
import HelpSupport from "../components/HelpSupport";

function Profile() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className={Pro["profile-container"]}>
      <ProfileSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className={Pro["profile-main"]}>
        {
          activeSection === "profile" ? (
            <ProfileInfo />
          ) : activeSection === "addresses" ? (
            <AddressManager />
          ) : activeSection === "orders" ? (
            <OrderHistory />
          ) : activeSection === "wishlist" ? (
            <WishlistManager />
          ) : activeSection === "settings" ? (
            <Settings />
          ) : activeSection === "help" ? (
            <HelpSupport />
          )
          : (
            <ProfileInfo />
          )
        }
      </main>
    </div>
  );
}

export default Profile;
