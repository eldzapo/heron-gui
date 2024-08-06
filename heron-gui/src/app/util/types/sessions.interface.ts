import { User } from "./user.interface";

export interface Session {
    id: Number | null | undefined;
    startDate: Date;
    endDate: Date;
    reserved: boolean;
    userId?: number | null | undefined;
    customer?: User | null | undefined;
  }
  