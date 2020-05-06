export interface IEmail {
  localPart: string;
  domain: string;
  complete: string;
}

export interface IAddress{
  streetName: string;
  houseNumber: string;
  postalCode: string;
  country: string;
}

export interface IPhoneNumber {
  number: string;
  countryCallingCode: string;
}

export interface ICustomer{
  id?: string;
  address?: IAddress;
  email?: IEmail;
  firstname?: string;
  lastname?: string;
  phoneNumber?: IPhoneNumber;
}
