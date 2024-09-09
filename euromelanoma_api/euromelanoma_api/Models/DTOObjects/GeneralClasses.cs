using euromelanoma_api.Models.EuromelanomaContext;

namespace euromelanoma_api.Models.DTOObjects
{
    public class RequestResult<T>
    {
        private bool v;
        private List<Users> users;
        private object value1;
        private object value2;

        public bool Success { get; set; }
        public T Result { get; set; }
        public List<T>? ResultList { get; set; }
        public string Message { get; set; }
        public int? RecordsFiltered { get; set; }
        public int? RecordsTotal { get; set; }

        /// <summary>
        /// RequestResult za retunr objekta
        /// </summary>
        /// <param name="success"></param>
        /// <param name="result"></param>
        /// <param name="message"></param>
        public RequestResult(bool success, T result, string message)
        {
            Success = success;
            Result = result;
            Message = message;
        }

        /// <summary>
        /// RequestResult za retun listu objekata
        /// </summary>
        /// <param name="s"></param>
        /// <param name="r"></param>
        /// <param name="m"></param>
        /// <param name="rf"></param>
        /// <param name="rt"></param>
        public RequestResult(bool s, List<T> r, string m, int? rf, int? rt)
        {
            Success = s;
            ResultList = r;
            Message = m;
            RecordsFiltered = rf;
            RecordsTotal = rt;
        }

        public RequestResult(bool v, List<Users> users, object value1, object value2)
        {
            this.v = v;
            this.users = users;
            this.value1 = value1;
            this.value2 = value2;
        }
    }
}
