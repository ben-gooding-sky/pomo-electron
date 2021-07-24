import React, { FC, useState } from 'react';
import { logger } from '@electron/services/logger';

export const SlackAuth: FC = () => {
  const [token, setToken] = useState('');
  const [cookie, setCookie] = useState('');
  const [sCookie, setSCookie] = useState('');

  return (
    <div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={(e) => {
          e.preventDefault();
          logger.info('submit');
          if ([token, cookie, sCookie].includes('')) {
            return;
          }

          logger.info('submit');

          window.bridge.storeUpdate({
            slackToken: token,
            slackDCookie: cookie,
            slackDSCookie: sCookie,
          });
        }}
      >
        <label>
          Slack Token:
          <input
            type="password"
            value={token}
            onChange={({ target }) => {
              setToken(target.value);
            }}
          />
        </label>
        <label>
          Slack d cookie:
          <input
            type="password"
            value={cookie}
            onChange={({ target }) => {
              setCookie(target.value);
            }}
          />
        </label>
        <label>
          Slack ds cookie:
          <input
            type="password"
            value={sCookie}
            onChange={({ target }) => {
              setSCookie(target.value);
            }}
          />
        </label>
        <button type="submit">submit</button>
      </form>
      <button
        type="button"
        onClick={() => {
          window.bridge.openExternal('https://github.com/AHDesigns/pomo-electron#usage');
        }}
      >
        where do I get these?
      </button>
    </div>
  );
};
