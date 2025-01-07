import { FaSquareFacebook } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';
import { FaTelegram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import styles from './index.module.css';
import { LogoDisplay } from '..';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <nav className={styles.footer_navbar}>
        <ul>
          <li>
            <a title="Facebook" href="#" target="_blank">
              <FaSquareFacebook />
            </a>
          </li>
          <li>
            <a title="Instagram" href="#" target="_blank">
              <RiInstagramFill />
            </a>
          </li>
          <li>
            <a title="Telegram" href="#" target="_blank">
              <FaTelegram />
            </a>
          </li>
          <li>
            <a title="X/Twitter" href="#" target="_blank">
              <FaXTwitter />
            </a>
          </li>
          <li>
            <a title="E-mail" href="#" target="_blank">
              <MdEmail />
            </a>
          </li>
        </ul>
      </nav>
      <LogoDisplay customClass="footer_logo" />
      <p>Copyright 2024. All Rights Reserved</p>
    </div>
  );
};

export default Footer;
