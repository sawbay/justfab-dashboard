'use client';

import { useEffect } from 'react';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import { List } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page';
import { useAuth } from '@futureverse/auth-react';

export default function InitDataPage() {
  const { userSession } = useAuth();
  const initDataState = useSignal(initData.state);

  useEffect(() => { }, [userSession, initDataState]);

  return (
    <Page>
      <List>
        {initDataState?.user && <p>ID: {initDataState?.user.id} - Name: {initDataState?.user.firstName}</p>}
        {userSession && <p>Futurepass: {JSON.stringify(userSession, null, 2)}</p>}
      </List>
    </Page>
  );
};
