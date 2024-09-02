namespace euromelanoma_api.Models.DTOObjects
{
    public class AdminClasses
    {
        public class RegisterUserModel
        {
            public string Username { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string UserType { get; set; }
          
        }
    }
}
