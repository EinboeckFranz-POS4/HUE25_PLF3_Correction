namespace BikeStore.Dtos;

public class OrderItemReplayDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal ListPrice { get; set; }
}