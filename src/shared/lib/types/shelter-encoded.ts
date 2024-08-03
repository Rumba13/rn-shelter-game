import { Shelter } from '@/src/shared/lib/types/shelter';

export type ShelterEncoded ={
  rooms:string,
  resources:string
} &  Shelter