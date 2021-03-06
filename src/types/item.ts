import { NotificationTexts } from "./notification";

export interface ItemNotification {
  id: string;
  date: Date;
}

export interface ItemCreation {
  description: string;
  amount: number;
  months: number[];
  notification?: ItemNotification;
}

export interface Item extends ItemCreation {
  id: string;
  isPaid: boolean;
  notification: ItemNotification;
  toRemove?: boolean;
}

export interface UpdateItemParams {
  item: Item;
  oldAmount: number;
  oldNotif: ItemNotification;
  notifTexts: NotificationTexts;
}

export interface RemoveItemParams {
  id: string;
  months: number[];
  amount: number;
}

export interface CreateItemParams {
  item: ItemCreation;
  notifTexts: NotificationTexts;
}
