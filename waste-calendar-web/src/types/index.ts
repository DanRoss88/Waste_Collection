// types/index.ts
export type CollectionType = 'GARBAGE' | 'RECYCLING' | 'COMPOST';

export interface CollectionEvent {
  id?: string;
  type: CollectionType;
  date: Date;
  recurrence: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
}

export interface UserSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
  accessToken: string;
}
