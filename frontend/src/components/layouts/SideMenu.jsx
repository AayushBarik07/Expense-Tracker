import React, { useState, useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data.js';
import { BASE_URL } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { LuUser } from 'react-icons/lu';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  // Raw value coming from backend (may be full URL or relative path)
  const profileImageRaw = user?.profileImageUrl || user?.profileImageURL || "";

  // Resolve to full URL if backend returned a relative path
  const profileImage = (() => {
    if (!profileImageRaw) return "";
    // Already absolute
    if (profileImageRaw.startsWith('http://') || profileImageRaw.startsWith('https://')) return profileImageRaw;
    // Ensure leading slash
    const path = profileImageRaw.startsWith('/') ? profileImageRaw : `/${profileImageRaw}`;
    return `${BASE_URL}${path}`;
  })();

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.fullName) return "U";
    return user.fullName
      .split(" ")
      .map(name => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleClick = (route) => {
    if(route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  }

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="h-[calc(100vh-90px)] border border-[#d8e5d3] bg-[#fbfdf9] sticky top-[90px] p-5 rounded-2xl overflow-y-auto shadow-[0_16px_35px_-30px_rgba(17,62,2,0.2)]">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 text-center">
        {profileImage && !imgError ? (
          <img
            src={profileImage}
            alt="Profile Image"
            className="w-16 h-16 bg-[#5FD37022] rounded-full object-cover border border-[#5FD37055]"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 bg-linear-to-br from-[#5FD370] to-[#49b859] rounded-full flex items-center justify-center shadow-[0_14px_24px_-18px_rgba(95,211,112,0.75)]">
            <div className="flex items-center justify-center">
              {user?.fullName ? (
                <span className="text-[#06200d] font-bold text-lg">{getInitials()}</span>
              ) : (
                <LuUser className="text-[#06200d] text-2xl" />
              )}
            </div>
          </div>
        )}
        <h5 className="font-semibold text-[#113E02] leading-6">{user?.fullName || ""}</h5>
      </div>

      <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#6b8364] mb-2 px-1">Main</p>

      {SIDE_MENU_DATA.map((item) => (
        <button 
          key={`menu_${item.id}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-[#05210b] bg-[#5FD370] shadow-[0_10px_20px_-16px_rgba(95,211,112,0.75)]" : "text-[#355a2f]"} py-3 px-4 rounded-xl hover:bg-[#eaf4e7] transition-all duration-200 mb-1`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
