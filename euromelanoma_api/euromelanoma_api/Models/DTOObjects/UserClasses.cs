namespace euromelanoma_api.Models.DTOObjects
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string NazivUsera { get; set; }
        public string UserType { get; set; }
        public string Token { get; set; }
    }


    public class UserModelForTheHash
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

    }

    public class PasswordResetRequestDto
    {
        public string Email { get; set; }
    }

    public class ResetPasswordDto
    { 
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }

}
