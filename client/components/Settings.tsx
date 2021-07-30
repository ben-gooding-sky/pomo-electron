import React, { FC, useState } from 'react';
import { useConfig } from '@client/components/useConfig';
import { Button } from '@client/components/Button';
import styled, { useTheme } from 'styled-components';
import { Checkbox } from '@client/components/Checkbox';

const Form = styled.form`
  display: grid;
  grid-template-columns: [left] 30% [middle-l] 1fr [middle-r] 65% [right];
  gap: ${({ theme }) => theme.spacing.normal}px 0;
  margin-bottom: ${({ theme }) => theme.spacing.normal}px;
`;

const Label = styled.label`
  grid-column: left / middle-l;
  text-align: right;
  line-height: 2em;
`;

const InputText = styled.input`
  grid-column: middle-r / right;
  text-align: left;

  color: ${({ theme }) => theme.palette.whiteBright};
  background: ${({ theme }) => theme.palette.backgroundBright};
  border: thin solid ${({ theme }) => theme.palette.backgroundProminent};
  border-radius: 3px;
  line-height: 2em;
  padding-left: 5px;
  width: 80%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.05em ${({ theme }) => theme.palette.background},
      0 0 0 0.15em ${({ theme }) => theme.palette.bright};
  }
`;

const SettingSlack: FC = () => {
  const {
    config: { slack },
    storeUpdate,
  } = useConfig();
  const theme = useTheme();

  const [token, setToken] = useState('');
  const [cookie, setCookie] = useState('');
  const [sCookie, setSCookie] = useState('');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <div
          style={{
            padding: '10px 0',
            marginBottom: '20px',
            backgroundColor: theme.palette.backgroundProminent,
          }}
        >
          <Checkbox
            label="Slack"
            checked={slack.enabled}
            onChange={() => {
              storeUpdate({
                slack: {
                  enabled: !slack.enabled,
                },
              });
            }}
          />
        </div>

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
                gridColumn: 'middle-r / right',
                textAlign: 'left',
              }}
            >
              <Button type="button" variant="tertiary" onClick={() => {}}>
                where do I get these from?
              </Button>
            </div>
            <div style={{ gridColumn: 'middle-r / right', display: 'flex' }}>
              <div style={{ marginRight: `${theme.spacing.normal}px` }}>
                <Button disabled={[token, cookie, sCookie].includes('')} type="submit">
                  Submit
                </Button>
              </div>
              <Button
                disabled={[token, cookie, sCookie].includes('')}
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
      </div>
    </>
  );
};

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
`;

const SettingTimer: FC = () => {
  const {
    config: { timers },
    storeUpdate,
  } = useConfig();
  const theme = useTheme();

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <div
          style={{
            padding: '10px 0 10px 55px',
            marginBottom: '20px',
            backgroundColor: theme.palette.backgroundProminent,
          }}
        >
          <H2>Timer</H2>
        </div>

        <Form>
          <Label htmlFor="pomo">Pomodoro</Label>
          <InputText
            name="pomo"
            id="pomo"
            type="number"
            min={0}
            max={120}
            placeholder="xocx-..."
            value={timers.pomo}
            onChange={({ target: { value } }) => {
              storeUpdate({
                timers: {
                  pomo: Number(value),
                },
              });
            }}
          />
          <Label htmlFor="short-break">Short break</Label>
          <InputText
            name="short-break"
            id="short-break"
            type="number"
            min={0}
            max={120}
            placeholder="xocx-..."
            value={timers.shortBreak}
            onChange={({ target: { value } }) => {
              storeUpdate({
                timers: {
                  shortBreak: Number(value),
                },
              });
            }}
          />
          <Label htmlFor="long-break">Long break</Label>
          <InputText
            name="long-break"
            id="long-break"
            type="number"
            min={0}
            max={120}
            placeholder="xocx-..."
            value={timers.longBreak}
            onChange={({ target: { value } }) => {
              storeUpdate({
                timers: {
                  longBreak: Number(value),
                },
              });
            }}
          />
        </Form>
      </div>
    </>
  );
};

export const Settings: FC = () => (
  <>
    <SettingTimer />
    <SettingSlack />
  </>
);
