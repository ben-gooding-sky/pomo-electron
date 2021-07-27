import React, { FC, useState } from 'react';
import { logger } from '@electron/services/logger';
import { Button } from '@client/components/Button';
import { useConfig } from '@client/components/useConfig';

export const SlackAuth: FC = () => {
  const { storeUpdate } = useConfig();
  const [token, setToken] = useState('');
  const [cookie, setCookie] = useState('');
  const [sCookie, setSCookie] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logger.info('submit');
          if ([token, cookie, sCookie].includes('')) {
            return;
          }

          logger.info('submit');

          storeUpdate({
            _tag: 'FullUserConfig',
            slackToken: token,
            slackDCookie: cookie,
            slackDSCookie: sCookie,
          });
        }}
      >
        <p style={{ textAlign: 'right', marginRight: '50px' }}>
          <label>
            Slack Token:{' '}
            <input
              style={{ width: '200px' }}
              type="password"
              value={token}
              onChange={({ target }) => {
                setToken(target.value);
              }}
            />
          </label>
        </p>
        <p style={{ textAlign: 'right', marginRight: '50px' }}>
          <label>
            Slack d cookie:{' '}
            <input
              style={{ width: '200px' }}
              type="password"
              value={cookie}
              onChange={({ target }) => {
                setCookie(target.value);
              }}
            />
          </label>
        </p>
        <p style={{ textAlign: 'right', marginRight: '50px' }}>
          <label>
            Slack ds cookie:{' '}
            <input
              style={{ width: '200px' }}
              type="password"
              value={sCookie}
              onChange={({ target }) => {
                setSCookie(target.value);
              }}
            />
          </label>
        </p>
        <p>
          <Button type="submit">submit</Button>
        </p>
      </form>
      <Button
        type="button"
        onClick={() => {
          window.bridge.openExternal('https://github.com/AHDesigns/pomo-electron#usage');
        }}
      >
        where do I get these?
      </Button>
    </div>
  );
};
