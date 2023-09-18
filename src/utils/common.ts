import { IUser } from "../interfaces";

export const getPeriodDate = (value: string) => {
    const dateFormat = new Date(value);
    const periodDate = dateFormat.toISOString().slice(0, 7)
    return periodDate
}

export const getFullName = (user: IUser) => {
    return `${user.firstName} ${user.lastName}`
}

export const getDaysArray = function(start: number, end: number) {
    const arr: string[] = [];
  
    for(let indexYear= start; indexYear <= end; indexYear++){
      for(let indexMonth= 1; indexMonth <= 12; indexMonth++){
        let month = indexMonth.toString().padStart(2, '0')
        arr.push(indexYear +"-"+ month)
      }
    }
  
    return arr;
};


