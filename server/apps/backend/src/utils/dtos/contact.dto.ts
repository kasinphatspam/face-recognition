class CreateNewContactDto {
    public firstname: string
    public lastname: string
    public organizationName: string
    public titile: string
    public officePhone: string
    public mobile: string
    public email: string
    public alternateEmail: string
    public dob: Date
    public contactOwner: string
    public createdTime: Date
    public modifiedTime: Date
    public lineId: string
    public facebook: string
    public linkedin: string
}

class EncodeContactImageDto {
    public imageBase64: string
}

class EncodeImageResponseDto {
    public encodedData: string
}

export { CreateNewContactDto, EncodeContactImageDto, EncodeImageResponseDto }