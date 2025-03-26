import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoading } from "../Components/GlobalLoading";
const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen, setPopupVisible, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { startLoading, completeLoading } = useLoading();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };
  const handleItemClick = () => {
    setIsActive(!isActive);  // Toggle active state on click
    toggleMenu();  // Call your existing toggle function
  }
  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  const handleSubMenuClick = (subRouteName) => {
    if (subRouteName == "Administration ") {
      navigate("/Administration")
      startLoading()
    } else {
      setActiveTab(subRouteName);
      setPopupVisible(true);
      startLoading()
    }
    setTimeout(() => {
      completeLoading();
    }, 500);
  };
  return (
    <>
      <div className={`menu ${isActive ? 'bg-blue-500' : 'bg-transparent'}`} onClick={handleItemClick}>
        <div className="menu_item">
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
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                  rotate: -90,
                }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <NavLink to={subRoute.path} className="link" onClick={() => handleSubMenuClick(subRoute.name)}>
                  <div className="icon">{subRoute.icon}</div>
                  <motion.div className="link_text">{subRoute.name}</motion.div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
