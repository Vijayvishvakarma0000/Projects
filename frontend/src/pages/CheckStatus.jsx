import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../redux/Slices/authSlice";
import API from "../api/api";

const CheckStatus = () => {
  const token = useSelector(getToken);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile Data:", res.data);
      } catch (err) {
        console.error("Profile check failed:", err);
      }
    };
    checkProfile();
  }, [token]);

  return <div>Checking user status...</div>;
};

export default CheckStatus;
