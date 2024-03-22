using Lws;

HelloEndpointClient client = new HelloEndpointClient();
var response = await client.SayHelloAsync(new () { Name = "John Doe" });
Console.WriteLine(response.HelloResponse.Message);
