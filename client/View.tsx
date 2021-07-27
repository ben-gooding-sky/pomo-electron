import React, { FC, useState } from 'react';
import { Page } from '@client/components/Page';
import { PomodoroControl } from '@client/components/PomodoroControl';
import { SlackAuth } from '@client/components/SlackAuth';
import { LineBreak } from '@client/components/LineBreak';
import { Button } from '@client/components';
import { useConfig } from '@client/components/useConfig';

export const View: FC = () => {
  const [confirmClear, setConfirmClean] = useState(false);
  const { config, storeReset } = useConfig();
  return (
    <Page>
      <div style={{ marginTop: '20px' }}>
        <PomodoroControl userConfig={config} />
      </div>
      {config._tag === 'emptyConfig' && <SlackAuth />}
      {config._tag !== 'emptyConfig' && (
        <>
          <LineBreak />
          <Button
            type="button"
            onClick={() => {
              setConfirmClean(true);
            }}
          >
            clear slack creds
          </Button>
        </>
      )}
      {confirmClear && (
        <div>
          <p>are you sure?</p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Button
              type="button"
              onClick={() => {
                storeReset();
                setConfirmClean(false);
              }}
            >
              yes I am sure
            </Button>
            <Button
              type="button"
              onClick={() => {
                setConfirmClean(false);
              }}
            >
              no, ignore me
            </Button>
          </div>
        </div>
      )}
    </Page>
  );
};
