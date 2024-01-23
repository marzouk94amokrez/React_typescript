import moment from "moment";

export function addDaysToDate(date:Date, days:number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isValidDate(date:Date, format="YYYY-MM-DD") {
  return moment(new Date(date), format).isValid();
}

export function isStarded(dateStart?:any, format="YYYY-MM-DD"){
    const start = dateStart ? new Date(dateStart) : "";
    if(new Date() < start){
      return false;
    }
    return true;
}

export function capitalize(str:string) {
  const loweredCase = str.toLowerCase();
  return str.charAt(0).toUpperCase() + loweredCase.slice(1);
}
