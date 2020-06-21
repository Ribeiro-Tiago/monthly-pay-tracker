import storage from "@react-native-community/async-storage";

import {
  Item,
  StorageData,
  SupportedLocales,
  SupportedCurrencies,
} from "../types";
import { Notification, StoredNotification } from "../types/notification";

type Metadata = {
  amountLeft: number;
  currMonth: number;
};

type SetParams =
  | Metadata
  | Item[]
  | SupportedLocales
  | SupportedCurrencies
  | StoredNotification[];

type StorageKey = "items" | "metadata" | "locale" | "currency" | "notifs";

const key = "MPT_DATA";

// backwards compatible fix. If months on items were in the old way, formats them to new way
// added in v2.1.0, to remove asap
const handleItems = (items: string) => {
  if (!items) {
    return [];
  }

  const newItems: Item[] = JSON.parse(items).map((item: Item) => ({
    ...item,
    months: item.months.map((m: any) => {
      return typeof m === "number" ? m : m.id;
    }),
  }));

  set("items", newItems);

  return newItems;
};

const get = async (key: StorageKey) => {
  return await storage.getItem(`${key}_${key}`);
};

const set = async (subkey: StorageKey, data: SetParams) => {
  const stringified = typeof data === "string" ? data : JSON.stringify(data);

  return await storage.setItem(`${key}_${subkey}`, stringified);
};

const getNotifs = async (): Promise<StoredNotification[]> => {
  try {
    return JSON.parse(await get("notifs"));
  } catch (err) {
    return [];
  }
};

export const getData = async (): Promise<StorageData> => {
  const [items, metadata, currency] = await Promise.all([
    get("items"),
    get("metadata"),
    get("currency"),
  ]);

  if (!items && !metadata && !currency) {
    return undefined;
  }

  return {
    items: handleItems(items),
    currency: currency || SupportedCurrencies.EUR,
    ...(metadata && { ...JSON.parse(metadata) }),
  };
};

export const updateCurrMonth = async (currMonth: number) => {
  const data = JSON.parse(await get("metadata")) as Metadata;

  return !data
    ? set("metadata", { amountLeft: 0, currMonth })
    : set("metadata", { amountLeft: data.amountLeft, currMonth });
};

export const updateAmount = async (amount: number) => {
  return set("metadata", {
    currMonth: new Date().getMonth(),
    amountLeft: Number(amount.toFixed(2)),
  });
};

export const updateItems = async (items: Item[]) => {
  return set("items", items);
};

export const getLocale = async (): Promise<SupportedLocales> => {
  return (await storage.getItem(`${key}_locale`)) as SupportedLocales;
};

export const updateLocale = async (locale: SupportedLocales) => {
  return await set("locale", locale);
};

export const updateCurrency = async (currency: SupportedCurrencies) => {
  return await set("currency", currency);
};

export const updateNotifs = async (notif: StoredNotification) => {
  const notifs: StoredNotification[] = await getNotifs();

  set(
    "notifs",
    notifs.map((n) => (n.id === notif.id ? notif : n)),
  );
};

export const removeNotif = async (notifId: string) => {
  const notifs: StoredNotification[] = await getNotifs();

  set(
    "notifs",
    notifs.filter(({ id }) => id !== notifId),
  );
};

export const addNotif = async (notif: StoredNotification) => {
  const notifs: StoredNotification[] = await getNotifs();
  notifs.push(notif);

  set("notifs", notifs);
};

export const getNotif = async (notifId: string) => {
  const notifs: StoredNotification[] = await getNotifs();

  return notifs.find(({ id }) => id === notifId);
};
