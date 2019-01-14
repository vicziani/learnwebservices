using HelloServiceReference;
using System;
using System.Threading.Tasks;

namespace SoapClient
{
    class Program
    {
        public static void Main(string[] args)
        {
            MainAsync(args).GetAwaiter().GetResult();
        }

        static async Task MainAsync(string[] args)
        {
            await CallWCFService();           
        }

        private static async Task CallWCFService()
        {
            HelloEndpointClient proxy = new HelloEndpointClient();
            var request = new helloRequest
            {
                Name = "John Doe"
            };
            var response = await proxy.SayHelloAsync(request);
            Console.WriteLine(response.Body.HelloResponse.Message);
        }
    }
}
