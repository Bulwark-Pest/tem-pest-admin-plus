import generateID from 'unique-id-generator';
import parser from 'libphonenumber-js';

export const addNewPhoneNumber = (phoneNumber) => {
  let randomId   = generateID({prefix:"id-"});
  let phoneItems = [];
  const mePhone = {
    id: randomId,
    number: phoneNumber,
    codeType: "3", // Mobile,
    textType: "Mobile"
  }
  phoneItems.push(mePhone);
  localStorage.setItem('phoneNumberList',JSON.stringify(phoneItems));

}
export const parseStringToPhoneNumber = (text) => {
  let phone = parser(text,"US");
  if (!phone || !phone.isValid()) return false;

  phone = "" + phone.number.replace(/[^0-9]/g, "");
  if (phone.length > 9 && phone.startsWith("1")) {
    phone = phone.substring(1);
  }
  return phone;
}
