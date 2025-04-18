'use client';

import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page';

import tonSvg from './_assets/ton.svg';

export default function Home() {
  const t = useTranslations('i18n');

  return (
    <Page back={false}>
      <List>
        <Section>
          <Link href="/fp">
            <Cell>
              FP Login
            </Cell>
          </Link>
        </Section>
        <Section>
          <Link href="/init-data">
            <Cell subtitle="User data, chat information, technical data">
              User Data
            </Cell>
          </Link>
        </Section>
        {/* <Section header={t('header')} footer={t('footer')}>
          <LocaleSwitcher/>
        </Section> */}
      </List>
    </Page>
  );
}
