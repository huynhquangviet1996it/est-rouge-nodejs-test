import { IModificationNote } from '../common/model';

export interface IEvent {
  _id?: string;
  event_name?: string;
  description?: string;
  start_date?: Date;
  due_date?: Date;
  is_deleted?: boolean;
  modification_notes?: IModificationNote[];
}
