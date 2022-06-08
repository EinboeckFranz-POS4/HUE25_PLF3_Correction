namespace BikeStore.Controllers;

[Route("[controller]")]
[ApiController]
public class ValuesController : ControllerBase
{
  private readonly BikeStoreContext _db;
  public ValuesController(BikeStoreContext db)
  {
    _db = db;
  }
  
  [HttpGet("customers")]
  public object Getcustomers()
  {
    Console.WriteLine($"{DateTime.Now:HH:mm:ss} Getcustomers");
    try
    {
  	  int nr = _db.Customers.Count();
  	  return new { IsOk = true, Nr = nr };
    }
    catch (Exception exc)
    {
  	  return new { IsOk = false, Nr = -1, Error = exc.Message };
    }
  }

}
