namespace BikeStore.Controllers;

[Route("[controller]")]
[ApiController]
public class CategoryController: ControllerBase
{
    private readonly CategoryService _service;
    public CategoryController(CategoryService service) => _service = service;

    [HttpGet]
    public ActionResult<List<CategoryDto>> GetCategories(int storeId)
    {
        $"GetCategories StoreId:{storeId}".LogToConsole();
        
        var categoryDtos = _service.GetCategoryDtos(storeId);
        return categoryDtos.Any() ? Ok(categoryDtos) : NotFound("No suitable Categories found");
    }
}