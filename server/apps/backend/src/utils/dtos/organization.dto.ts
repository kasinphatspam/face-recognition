class GetOrganizationByIdDto {
    public organizationId: number
}

class GetCurrentOrganizationDto {
    public userId: number
}

class CreateOrganizationDto {
    public organizatioName: string
    public userId: number
}

class UpdateOrganizationDto {
    public organizationId: number
    public organizatioName: string
}

class DeleteOrganizationDto {
    public organizationId: number
}

class JoinOrganizationDto {
    public userId: number
}

class GenerateNewPasscodeDto {
    public organizationId: number
}

export { GetOrganizationByIdDto, GetCurrentOrganizationDto, CreateOrganizationDto, UpdateOrganizationDto, DeleteOrganizationDto, JoinOrganizationDto, GenerateNewPasscodeDto }