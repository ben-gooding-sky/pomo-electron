import React, { FC, useState } from 'react';
import { Page } from '@client/components/Page';
import styled from 'styled-components';
import { Pomodoro } from '@client/components/Pomodoro';
import { Settings } from '@client/components/Settings/Settings';
import { Box } from '@client/components/Box';
import { MenuButton } from '@client/components/MenuButton';
import { useConfig } from '@client/components/useConfig';

const Header = styled.div`
  display: grid;
  grid-template-columns: [left] 20% [middle] 60% [right] 20%;
  padding: ${({ theme }) => `${theme.spacing.small}px`} 0;
`;

export type Pages = 'Pomodoro' | 'Settings';

export const PageManager: FC = () => {
  const [page, navigatePageTo] = useState<Pages>('Pomodoro');
  const { loading, config } = useConfig();

  if (loading) {
    return <p>loading...</p>;
  }

  console.log('loaded with config', config);

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
      </Header>
      <Box style={{ flexGrow: 1 }}>
        {page === 'Settings' && <Settings />}
        {page === 'Pomodoro' && <Pomodoro />}
      </Box>
    </Page>
  );
};
