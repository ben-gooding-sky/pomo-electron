import React, { FC, useState } from 'react';
import { Page } from '@client/components/Page';
import styled from 'styled-components';
import { Pomodoro } from '@client/components/Pomodoro';
import { Settings } from '@client/components/Settings';
import { Button } from '@client/components/Button';

const Header = styled.div`
  display: grid;
  grid-template-columns: [left] 20% [middle] 60% [right] 20%;

  margin-bottom: 20px;
`;

export type Pages = 'Pomodoro' | 'Settings';

export const PageManager: FC = () => {
  const [page, navigatePageTo] = useState<Pages>('Pomodoro');

  return (
    <Page>
      <h1 style={{ display: 'none' }}>Pomodoro App</h1>
      <Header>
        <div style={{ gridColumn: 'left', padding: '10px' }}>
          <Button
            variant="secondary"
            onClick={() => {
              navigatePageTo(page === 'Settings' ? 'Pomodoro' : 'Settings');
            }}
          >
            {page === 'Settings' ? 'Close' : 'Settings'}
          </Button>
        </div>
        <div
          style={{
            gridColumn: 'middle',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2>{page === 'Settings' ? 'Settings' : 'Timer'}</h2>
        </div>
      </Header>
      {page === 'Settings' && <Settings />}
      {page === 'Pomodoro' && <Pomodoro />}
    </Page>
  );
};
