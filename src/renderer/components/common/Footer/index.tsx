import React from 'react';
import style from './Footer.module.scss';

const Footer = () => (
  <footer className={style.footer}>
    <div className={`${style.footer} ${style.container}`}>
      <p>
        developed by{' '}
        <a
          href="https://github.com/SergeiNevostruev"
          target="_blank"
          rel="noreferrer"
        >
          Nevostruev Sergei
        </a>
        , 2022
      </p>
    </div>
  </footer>
);

export default Footer;
