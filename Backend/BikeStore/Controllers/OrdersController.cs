using NuGet.Protocol;

namespace BikeStore.Controllers;

[Route("[controller]")]
[ApiController]
public class OrderController: ControllerBase
{
    private readonly OrderService _service;
    public OrderController(OrderService service) => _service = service;

    [HttpPost]
    public ActionResult<OrderDto> CreateOrder([FromQuery] int storeId, [FromBody] List<OrderItemReplayDto> orderItems)
    {
        $"CreateOrder {orderItems.ToJson()}".LogToConsole();
        try
        {
            return Ok(_service.CreateOrderFromOrderDetails(storeId, orderItems));
        }
        catch (Exception)
        {
            return Problem("Could not create Order.");
        }
    }
}