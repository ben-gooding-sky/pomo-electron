import React, { FC, useState } from 'react';
import { Page } from '@client/components/Page';
import styled, { useTheme } from 'styled-components';
import { Pomodoro } from '@client/components/Pomodoro';
import { Settings } from '@client/components/Settings/Settings';
import { Box } from '@client/components/Box';
import { MenuButton } from '@client/components/MenuButton';
import { useConfig } from '@client/components/useConfig';
import pj from 'package.json';

const Header = styled.div`
  display: grid;
  grid-template-columns: [left] 20% [middle] 60% [right] 20%;
  padding: ${({ theme }) => `${theme.spacing.small}px`} 0;
`;

export type Pages = 'Pomodoro' | 'Settings';

export const PageManager: FC = () => {
  const [page, navigatePageTo] = useState<Pages>('Pomodoro');
  // const [page, navigatePageTo] = useState<Pages>('Settings');
  const { loading } = useConfig();
  const theme = useTheme();

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <Page>
      <h1 style={{ display: 'none' }}>Pomodoro App</h1>
      <Header>
        <MenuButton
          onClick={() => {
            navigatePageTo(page === 'Settings' ? 'Pomodoro' : 'Settings');
          }}
          showClose={page === 'Settings'}
        />
        <Box>
          <h2 style={{ textAlign: 'center' }}>{page === 'Settings' ? 'Settings' : 'Timer'}</h2>
        </Box>
        <Box>
          <p style={{ color: theme.palette.backgroundBrightest }}>Beta</p>
          <p style={{ color: theme.palette.backgroundBright }}>{pj.version}</p>
        </Box>
      </Header>
      <Box style={{ flexGrow: 1 }}>
        {page === 'Settings' && <Settings />}
        {page === 'Pomodoro' && <Pomodoro />}
      </Box>
    </Page>
  );
};
