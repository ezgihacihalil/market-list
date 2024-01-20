import { memo, useEffect, useState, useCallback } from "react";
import logo from "../../assets/logo.svg";

import style from "./style.module.css";

const useWindowResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
};

const HeaderComponent = () => {
  const [isLargeScreen, setLargeScreen] = useState(false);

  const handleResize = useCallback(() => {
    setLargeScreen(window.innerWidth >= 1088);
  }, []);

  useWindowResize(handleResize);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  const navigationLinks = ["Assets", "Solutions", "Information", "Support"];

  return (
    <header className={style.header}>
      <a
        href="https://www.bitvavo.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={style.logo} src={logo} alt="Bitvavo" />
      </a>
      {isLargeScreen ? (
        <div className={style.right}>
          <nav className={style.nav}>
            <ul className={style.navLinks}>
              {navigationLinks.map((link) => (
                <li key={link} className={style.navLink}>
                  {link}
                </li>
              ))}
            </ul>
          </nav>
          <div className={style.extraRight}>
            <div className={style.buttonContainer}>
              <button className={style.loginButton}>Login</button>
              <button className={style.signUpButton}>Sign up</button>
            </div>
            <div>
              <button className={style.languageSwitcher}>
                <span>EN</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.menu}>
          <span className={style.bar} />
          <span className={style.bar} />
          <span className={style.bar} />
        </div>
      )}
    </header>
  );
};

export const Header = memo(HeaderComponent);
