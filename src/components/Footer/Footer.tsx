import React, { FC } from "react";

import { FaGithub } from "react-icons/fa";
import cl from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <div className={cl.footer}>
      <div className={cl.footer_wrapper}>
        <div className={cl.footer_left}>Steddy</div>
        <div className={cl.footer_right}>
          <p>About Me</p>
          <div className={cl.footer_icon}>
            <a href="https://github.com/Steddyz" target="_blank">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
