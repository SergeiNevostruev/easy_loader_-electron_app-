import React, { useState } from 'react';
import {
  CloseOutlined,
  DownloadOutlined,
  CaretDownOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';

const Header = () => {
  const [maxWindow, setMaxWindow] = useState(false);
  const closeWindow = () => {
    window.buttonElectron.close();
  };
  const minimizeWindow = () => {
    window.buttonElectron.minimize();
  };
  const expandWindow = () => {
    setMaxWindow((v) => !v);
    window.buttonElectron.expand();
  };
  const selectButton = (callback: () => void) => (e: any) => {
    if (e.key === 'Enter') {
      callback();
    }
  };
  return (
    <header className={style.header}>
      <div
        className={`${style.header} ${style.container}`}
        onDoubleClick={expandWindow}
      >
        <div className={style.log}>
          <DownloadOutlined height="20em" width="20em" />
          <h1>Easy Loader</h1>
        </div>
        <div> </div>
      </div>
      <div className={style.BtnPanel}>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={selectButton(minimizeWindow)}
          className={style.Btn}
          onClick={minimizeWindow}
        >
          <CaretDownOutlined height="2em" width="2em" />
        </div>
        {maxWindow ? (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={selectButton(expandWindow)}
            className={style.Btn}
            onClick={expandWindow}
          >
            <FullscreenExitOutlined height="2em" width="2em" />
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={selectButton(expandWindow)}
            className={style.Btn}
            onClick={expandWindow}
          >
            <FullscreenOutlined height="2em" width="2em" />
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={selectButton(closeWindow)}
          className={style.Btn}
          onClick={closeWindow}
        >
          <CloseOutlined height="2em" width="2em" />
        </div>
      </div>
    </header>
  );
};

export default Header;
