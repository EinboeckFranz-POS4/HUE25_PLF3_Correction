namespace BikeStore.Services;

public class StoreService
{
    private readonly BikeStoreContext _db;
    public StoreService(BikeStoreContext db) => _db = db;
    
    public List<StoreDto> GetStoreDtos()
    {
        return _db.Stores
            .Select(x => new StoreDto().CopyPropertiesFrom(x))
            .ToList();
    }
}