namespace BikeStore.Services;

public class ProductService
{
    private readonly BikeStoreContext _db;
    public ProductService(BikeStoreContext db) => _db = db;
    
    public IEnumerable<ProductDto> GetProductsByCategoryAndStoreId(int categoryId, int storeId)
    {
        return _db.Stocks.Where(x => x.StoreId == storeId && x.Product.Category.CategoryId == categoryId)
            .Include(x => x.Product)
            .ThenInclude(x => x.Category)
            .Include(x => x.Product)
            .ThenInclude(x => x.Brand)
            .ToList()
            .Select(x => new
            {
                x.ProductId,
                x.Product.ProductName,
                Brand = x.Product.Brand.BrandName,
                Category = x.Product.Category.CategoryName,
                x.Product.ModelYear,
                x.Product.ListPrice,
            })
            .Distinct()
            .Select(x => new ProductDto().CopyPropertiesFrom(x));
    }
}