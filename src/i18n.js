import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          label: {
            name: 'Name',
            price: 'Price',
            note: 'Note',
            monthlySales: 'Monthly Sales',
            type: 'Type',
          },
          message: {
            maxQuantity: 'The maximum quantity is ',
            minQuantity: 'The minimum quantity is ',
          }
        }
      },
      cn: {
        translation: {
          label: {
            name: '店名',
            price: '价格',
            note: '备注',
            monthlySales: '月销量',
            type: '类型',
          },
          message: {
            maxQuantity: '购物车允许最大数量为 ',
            minQuantity: '购物车允许最小数量为 ',
          }
        }
      }
    }
  });

export default i18n;