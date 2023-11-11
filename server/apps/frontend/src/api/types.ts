export type Login = {
  email: string
  password: string
}

export type User = {
  id: string
  email: string
  password: string
  firstname: string
  lastname: string
  gender: string
  personId: string
  dob: string
  image: string
}

export type Register = {
  email: string
  password: string
  firstname: string
  lastname: string
  gender: string
  personId: string
  dob: string
  image: string
}

export type CreateOrg = {
  name: string
}

export type Org = {
  id: string
  name: string
  passcode: string
  codeCreatedTime: string
  vtigerToken: string
  vtigerAccessKey: string
  vtigerLink: string
  packageKey: string
  isPublic: boolean
  
}

export type ImageRecognition = {
  image: string
}