import storage from '@react-native-community/async-storage';

import { StorageData, Item } from '../../types';

type Metadata =
  | {
      amountLeft: number;
      currMonth: number;
    }
  | Item[];

const key = 'MPT_DATA';

const get = async () => {
  const items = JSON.parse(await storage.getItem(`${key}_items`));
  const metadata = JSON.parse(await storage.getItem(`${key}_metadata`));

  if (!items && !metadata) {
    return undefined;
  }

  return {
    ...(items && { items }),
    ...(metadata && { ...metadata }),
  } as StorageData;
};

const set = async (key: 'items' | 'metadata', data: Metadata) => {
  return await storage.setItem(key, JSON.stringify(data));
};

export const getData = async () => get();

export const updateCurrMonth = async (currMonth: number) => {
  const data = await get();

  return !data
    ? set('metadata', { amountLeft: 0, currMonth })
    : set('metadata', { amountLeft: data.amountLeft, currMonth });
};

export const updateAmount = async (amount: number) => {
  const data = await get();

  if (data) {
    return set('metadata', {
      currMonth: data.currMonth,
      amountLeft: Number((Number(data.amountLeft) + amount).toFixed(2)),
    });
  }

  return set('metadata', {
    currMonth: new Date().getMonth(),
    amountLeft: Number(amount.toFixed(2)),
  });
};

export const updateItems = async (items: Item[]) => {
  return set('items', items);
};
