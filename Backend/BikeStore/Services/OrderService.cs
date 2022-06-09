namespace BikeStore.Services;

public class OrderService
{
    private readonly BikeStoreContext _db;
    public OrderService(BikeStoreContext db) => _db = db;

    public OrderDto CreateOrderFromOrderDetails(int storeId, IEnumerable<OrderItemReplayDto> orderItems)
    {
        var order = CreateOrder(storeId);
        var orderId = order.OrderId;

        orderItems.Select((x, i) => new { index = i, orderItem = x}).ToList().ForEach(x =>
        {
            var orderItem = new OrderItem().CopyPropertiesFrom(x.orderItem);
            orderItem.OrderId = orderId;
            orderItem.Discount = 0;
            orderItem.ItemId = x.index + 1;
            _db.OrderItems.Add(orderItem);
        });
        _db.SaveChanges();

        return new OrderDto().CopyPropertiesFrom(order);
    }

    private Order CreateOrder(int storeId)
    {
        var orderToAdd = new Order
        {
            CustomerId = 1,
            OrderStatus = 4,
            OrderDate = DateTime.Now,
            RequiredDate = DateTime.Now.AddDays(7),
            StaffId = 1,
            StoreId = storeId
        };
        _db.Orders.Add(orderToAdd);
        _db.SaveChanges();
        return _db.Orders.First(x => x == orderToAdd);
    }
}