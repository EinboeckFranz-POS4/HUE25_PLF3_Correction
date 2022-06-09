namespace BikeStore.Services;

public class CategoryService
{
    private readonly BikeStoreContext _db;
    public CategoryService(BikeStoreContext db) => _db = db;

    public List<CategoryDto> GetCategoryDtos(int storeId)
    {
        return _db.Categories.Where(x => x.Products.SelectMany(y => y.Stocks).Any(y => y.StoreId == storeId))
            .ToList()
            .Select(x => new CategoryDto().CopyPropertiesFrom(x))
            .ToList();
    }
}