import React, { FC, useState } from 'react';
import { useConfig } from '@client/components/useConfig';
import { useTheme } from 'styled-components';
import { Setting } from '@client/components/Settings/Setting';
import { Form, InputText, Label } from '@client/components/Settings/Form';
import { Button } from '@client/components';

export const Slack: FC = () => {
  const {
    config: { slack },
    storeUpdate,
  } = useConfig();
  const theme = useTheme();
  const [token, setToken] = useState('');
  const [cookie, setCookie] = useState('');
  const [sCookie, setSCookie] = useState('');

  return (
    <Setting
      heading="Slack"
      variant="toggle"
      checked={slack.enabled}
      onToggle={() => {
        storeUpdate({
          slack: {
            enabled: !slack.enabled,
          },
        });
      }}
    >
      {slack.enabled && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            storeUpdate({
              slack: {
                slackToken: token,
                slackDCookie: cookie,
                slackDSCookie: sCookie,
              },
            });
            setToken('');
            setCookie('');
            setSCookie('');
          }}
        >
          <Label htmlFor="slackToken">Token</Label>
          <InputText
            name="slackToken"
            id="slackToken"
            type="password"
            placeholder="xocx-..."
            value={token}
            onChange={({ target }) => {
              setToken(target.value);
            }}
          />
          <Label htmlFor="slackCookie">Cookie "d"</Label>
          <InputText
            name="slackCookie"
            id="slackCookie"
            type="password"
            placeholder="xocx-..."
            value={cookie}
            onChange={({ target }) => {
              setCookie(target.value);
            }}
          />
          <Label htmlFor="slackCookieD">Cookie "ds"</Label>
          <InputText
            name="slackCookieD"
            id="slackCookieD"
            type="password"
            placeholder="xocx-..."
            value={sCookie}
            onChange={({ target }) => {
              setSCookie(target.value);
            }}
          />

          <div
            style={{
              gridColumn: 'left / right',
              textAlign: 'center',
            }}
          >
            <Button
              type="button"
              variant="tertiary"
              onClick={() => {
                window.bridge.openExternal('https://github.com/AHDesigns/pomo-electron');
              }}
            >
              where do I get these from?
            </Button>
          </div>
          <div
            style={{
              gridColumn: 'left / right',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <div style={{ marginRight: `${theme.spacing.normal}px` }}>
              <Button disabled={[token, cookie].includes('')} type="submit">
                Submit
              </Button>
            </div>
            <Button
              disabled={[token, cookie].includes('')}
              type="button"
              variant="secondary"
              onClick={() => {
                setToken('');
                setCookie('');
                setSCookie('');
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </Setting>
  );
};
