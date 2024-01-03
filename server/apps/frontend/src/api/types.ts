export type Login = {
  email: string;
  password: string;
};
export type UpdateUser = {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  personId: string;
  dob: string;
};
export type User = UpdateUser & {
  image: string;
};

export type Register = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  personId: string;
  dob: string;
  image: string;
};

export type CreateOrg = {
  name: string;
};

export type Org = {
  id: string;
  name: string;
  passcode: string;
  codeCreatedTime: string;
  vtigerToken: string;
  vtigerAccessKey: string;
  vtigerLink: string;
  packageKey: string;
  isPublic: boolean;
};

export type Image = {
  file: FormData;
};

export type Contact = {
  firstname: string;
  lastname: string;
  company: string;
  title: string;
  officePhone: string;
  mobile: string;
  email1: string;
  email2: string;
  dob: string;
  owner: string;
  createdTime: Date;
  modifiedTime: Date;
  lineId: string;
  facebook: string;
  linkedin: string;
};

export type Request = {
  id: number;
  requestTime: Date;
  organizationId: number;
  userId: number;
};

export type Plan = {
  title: string;
  cost: number;
  limitEmployee: number;
  limitContact: number;
  feature: string;
};
