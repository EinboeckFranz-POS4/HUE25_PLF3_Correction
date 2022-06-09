namespace BikeStore.Dtos;

public class ProductDto
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = null!;
    public string Brand { get; set; } = null!;
    public string Category { get; set; } = null!;
    public short ModelYear { get; set; }
    public decimal ListPrice { get; set; }
}