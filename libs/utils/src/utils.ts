import * as moment from 'moment';

export const sharedTest = () => {
  console.log('hi hellow?');
};

export const getMonthString = () => {
  return moment().format('YYYYMM');
};

export const getDayString = () => {
  return moment().format('YYYYMMDD');
};

export const isEmpty = (obj: any) => {
  return !obj || Object.keys(obj).length === 0;
};
