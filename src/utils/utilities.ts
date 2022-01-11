import {
  createStore,
  useStateMachine,
  StateMachineProvider,
  GlobalState,
} from "little-state-machine";

export const generateOtp = (length: number) => {
  let pin = "";
  for (let i = 0; i < length; i++) {
    pin += Math.floor(Math.random() * 6);
  }
  return pin;
};

export const convertDateToNum = (date: string) => {
  const month = date.split("-")[1];
  const day = date.split("-")[0];
  const year = date.split("-")[2];
  const monthNumber = switchMonthToNumber(month);
  const newDate = day + "" + monthNumber + "" + year;
  return newDate;
};

const switchMonthToNumber = (month: string) => {
  switch (month) {
    case "Jan":
      return "01";
    case "Feb":
      return "02";
    case "Mar":
      return "03";
    case "Apr":
      return "04";
    case "May":
      return "05";
    case "Jun":
      return "06";
    case "Jul":
      return "07";
    case "Aug":
      return "08";
    case "Sep":
      return "09";
    case "Oct":
      return "10";
    case "Nov":
      return "11";
    case "Dec":
      return "12";
    default:
      return "";
  }
};

export const getValues = (data: any, type: {}) => {
  if (data?.length > 0) {
    return [type, ...data];
  }
  return [];
};

export const getText = (data: any, value: any) => {
  return data[value]?.text;
};

export const getBase64 = (file: any) => {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL: string = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file[0]);

    // on reader load somthing...
    reader.onloadend = () => {
      // Make a fileInfo Object
      console.log("Called", reader);
      // baseURL = reader.result;
      console.log(baseURL);
      resolve(reader.result);
    };
    console.log(fileInfo);
  });
};
