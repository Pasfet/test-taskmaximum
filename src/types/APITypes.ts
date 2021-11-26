import {IBranches} from './dropdownTypes';
import { IFile } from './fileTypes';
import { IRadioInput } from './radioInputTypes';

export const SEND_FORM_URL = 'https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/send-form';
export const GET_CITIES_URL = 'https://6196084574c1bd00176c6ff1.mockapi.io/api/v1/cities';

export interface ResponseSendDataTypes {
  success: boolean;
}

export interface IInfoSubjectRequest {
  branches: IBranches | string;
  request_subject: IRadioInput | string | null;
  error_description: string;
  screenshots: IFile | null;
}
