namespace BikeStore.Controllers;

[Route("[controller]")]
[ApiController]
public class StoreController: ControllerBase
{
    private readonly StoreService _service;
    public StoreController(StoreService service) => _service = service;

    [HttpGet]
    public ActionResult<List<StoreDto>> GetStores()
    {
        "GetStores".LogToConsole();
        
        var storeDtos = _service.GetStoreDtos();
        return storeDtos.Any() ? Ok(storeDtos) : NotFound("No suitable Categories found");
    }
}