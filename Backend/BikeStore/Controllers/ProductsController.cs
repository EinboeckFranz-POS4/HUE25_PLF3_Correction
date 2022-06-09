namespace BikeStore.Controllers;

[Route("[controller]")]
[ApiController]
public class ProductController: ControllerBase
{
    private readonly ProductService _service;
    public ProductController(ProductService service) => _service = service;

    [HttpGet]
    public ActionResult<List<ProductDto>> GetProductsByCategoryAndStoreId(int categoryId, int storeId)
    {
        $"GetProducts CategoryId:{categoryId} StoreId:{storeId}".LogToConsole();
        
        var productDtos = _service.GetProductsByCategoryAndStoreId(categoryId, storeId);
        return productDtos.Any() ? Ok(productDtos) : NotFound("No suitable Products found");
    }
}