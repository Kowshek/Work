import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import ChannelGroupAndNetworkChannelPopup from "../Details/Administration/ChannelGroupAndNetworkChannelPopup";
import { PiClockBold } from "react-icons/pi";
import { IoLibrarySharp } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { RiPlayListFill } from "react-icons/ri";
import { SiCoderwall } from "react-icons/si";
import { TfiSettings } from "react-icons/tfi";
import { Tooltip } from "devextreme-react";
import { notifyMessage } from "../../utils/api";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { GiNetworkBars } from "react-icons/gi";
import { GrGroup } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";
import { useLoading } from "../Components/GlobalLoading";
const routes = [

  {
    path: "/Administration",
    name: "Administration",
    icon: <RiAdminLine />,
    subRoutes: [
      {
        path: "/Administration",
        name: "Administration ",
        icon: <GrUserAdmin />,
      },
      {
        path: "Channel Groups",
        name: "Channel Groups",
        icon: <GrGroup />,
      },
      {
        path: "Network Channels",
        name: "Network Channels",
        icon: <GiNetworkBars />,
      },
      {
        path: "Configuration",
        name: "Configuration",
        icon: <TfiSettings />,
      },
    ],
  },
  {
    path: "/Library",
    name: "Library",
    icon: <IoLibrarySharp />,
  },
  {
    path: "/Clock",
    name: "Clock",
    icon: <PiClockBold />,
  },
  {
    path: "/Program",
    name: "Program",
    icon: <TbDeviceDesktopCode />,
  },
  {
    path: "/Schedule",
    name: "Schedule",
    icon: <FaCalendarAlt />,
  },
  {
    path: "/PlayList",
    name: "PlayList",
    icon: <RiPlayListFill />,
  },
];
const SideBar = ({ children }) => {
  const ActiveChannelId = sessionStorage.getItem("ActiveChannelId");
  const [isOpen, setIsOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [getimgLogo, setimgLogo] = useState(sessionStorage.getItem("Image"));
  const [getChannelName, SetChannelName] = useState(
    sessionStorage.getItem("CurrentChannelName")
  );
  
  const { startLoading, completeLoading } = useLoading();
  const toggle = () => setIsOpen(!isOpen);

  const inputRef = useRef(null);

  const toggleSearch = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      removeHighlights();
      return;
    }
    highlightText(searchQuery);
  }, [searchQuery]);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const onpopupHide = () => {
    setPopupVisible(false);
    navigate("/Administration");
  };
  const handleTabChange = (route, event) => {
    // Check if ActiveChannelId is present
    if (!ActiveChannelId) {
      notifyMessage("Please select a channel first.", "error");
      event.preventDefault();
      return;
    } else {
      startLoading();
      navigate(route.path);
      setTimeout(() => {
        completeLoading(); // Complete loading after process is done
      }, 500);
    }
  };
  const userType = sessionStorage.getItem("Loginusertype");

  const filteredRoutes = routes.filter((route) => {
    if (userType === "Administrator" || userType === "Senior Administrator") {
      return true; // Show all tabs for these user types
    }

    // Hide certain routes for non-admin users
    if (route.path === "/Administration" || route.path === "/Program") {
      return false;
    }

    return true; // Show other routes
  });
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const highlightText = (query) => {
    removeHighlights(); // Remove previous highlights

    if (!query) return; // Do nothing if query is empty

    const elements = document.body.querySelectorAll(
      "*:not(script):not(style):not(input):not(textarea)"
    );

    elements.forEach((el) => {
      el.childNodes.forEach((node) => {
        if (node.nodeType === 3) {
          // Process only text nodes
          const text = node.nodeValue;
          const regex = new RegExp(`(${query})`, "gi"); // Match only entered letters

          if (regex.test(text)) {
            // Store the original text only once
            if (!el.dataset.originalText) {
              el.dataset.originalText = text;
            }

            // Highlight only the matched letters
            const newHTML = text.replace(
              regex,
              `<mark style="background-color: yellow; color: black;">$1</mark>`
            );

            const span = document.createElement("p");
            span.innerHTML = newHTML;
            el.replaceChild(span, node);
          }
        }
      });
    });
  };
  const removeHighlights = () => {
    document.querySelectorAll("[data-original-text]").forEach((el) => {
      el.innerHTML = el.dataset.originalText; // Restore original text
      delete el.dataset.originalText; // Remove stored data
    });
  };
  return (
    <>
      <div className="main-container" ref={sidebarRef}>
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          // className={``}
          className={`sidebar ${isOpen ? "open" : ""}`}
        >
          <div className="top_section" onClick={toggle}>
            <AnimatePresence>
              {isOpen && (
                <motion.h4
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="Sidebarlogo"
                >
                  SUNGROUPS
                  {/* <div className="SidebarLogoContainer">
                    <img
                      src={`data:image/png;base64,${getimgLogo}`}
                      className="brand-logo"
                    />
                    {getChannelName}
                  </div> */}
                </motion.h4>
              )}
            </AnimatePresence>

            <div className="bars">
              {/* <FaBars onClick={toggle} /> */}
              <SiCoderwall />
            </div>
          </div>
          <div className="search">
            <div className="search_icon" onClick={toggleSearch}>
              <FaSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  ref={inputRef}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {filteredRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                    setPopupVisible={setPopupVisible}
                    setActiveTab={setActiveTab}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  onClick={(e) => handleTabChange(route, e)}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main className={`main-content ${isOpen ? "shifted" : ""}`}>
          {children}
        </main>
        {console.log("activeTab", activeTab)}
        <ChannelGroupAndNetworkChannelPopup
          visible={popupVisible}
          activeTabs={activeTab == "Administration" ? "" : activeTab}
          onHiding={onpopupHide}
          title={
            activeTab === "Channel Groups"
              ? "Channel Groups"
              : activeTab === "Network Channels"
                ? "Network Channels"
                : activeTab === "Configuration"
                  ? "Configuration"
                  : "/Administration"
          }
          width={800}
          height={450}
        />
      </div>
    </>
  );
};
export default SideBar;
