import React, { FC } from 'react';
import { Timer } from '@client/components/Settings/Timer';
import { Slack } from '@client/components/Settings/Slack';

export const Settings: FC = () => (
  <>
    <Timer />
    <Slack />
  </>
);
