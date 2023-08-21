class UpdateUserDto {
  public firstname: string;
  public lastname: string;
  public gender: string;
  public personalId: string;
  public dob: Date;
  public profileImage: string;
  public organizationId: Number;
  public departmentId: Number;
  public roleId: Number;
}

class UpdateUserImageDto {
  public image: string;
}

export { UpdateUserDto, UpdateUserImageDto };
