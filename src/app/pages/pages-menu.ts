import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Kundenstamm',
    icon: 'shopping-cart-outline',
    data: {
      permission: 'J_KUNDE',
      level: '1'
    },
    children: [
      {
        title: 'Suche',
        link: '/pages/customer/search',
        home: true,
        data: {
          permission: 'J_KUNDE',
          level: '1'
        }
      },
      {
        title: 'Auftrag suchen',
        link: '/pages/customer/order-search',
        data: {
          permission: 'J_KUNDE',
          level: '1'
        }
      },
      {
        title: 'Kunde erfassen',
        link: '/pages/customer/details',
        data: {
          permission: 'J_KUNDE',
          level: '3'
        }
      },
      {
        title: 'Login migrieren',
        link: '/pages/customer/migrate',
        data: {
          permission: 'J_KUNDE',
          level: '3'
        }
      }
    ]
  },
  {
    title: 'Pflege',
    icon: 'settings-outline',
    data: {
      permission: 'J_ADMIN',
      level: '1'
    },
    children: [
      {
        title: 'Gutschein-Aliasse',
        link: '/pages/maintenance/coupon',
        data: {
          permission: 'J_ADMIN',
          level: '1'
        }
      },
      {
        title: 'Neuigkeiten',
        link: '/pages/news/list',
        data: {
          permission: 'J_NEWS',
          level: '3'
        }
      }
    ]
  }
];
