//----------------------------------------
// .Net Core WebApi project create script 
//           v6.2.0 from 2022-04-06
//   (C)Robert Grueneis/HTL Grieskirchen 
//----------------------------------------

using BikeStore.Services;

const string corsKey = "_myCorsKey";
const string swaggerVersion = "v1";
const string swaggerTitle = "BikeStore";

var builder = WebApplication.CreateBuilder(args);

#region -------------------------------------------- ConfigureServices
builder.Services.AddControllers();
builder.Services
  .AddEndpointsApiExplorer()
  .AddSwaggerGen(x => x.SwaggerDoc(
    swaggerVersion,
    new OpenApiInfo { Title = swaggerTitle, Version = swaggerVersion }
  ))
  .AddCors(options => options.AddPolicy(
    corsKey,
    x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
  ))
  .AddRestClientGenerator(options => options
	  .SetFolder(@"C:\Temp")
	  .SetFilename("_requests.http")
	  .SetAction($"swagger/{swaggerVersion}/swagger.json")
	  //.EnableLogging()
  );

var connectionString = builder.Configuration.GetConnectionString("BikeStore");
Console.WriteLine($"******** ConnectionString: {connectionString}");
builder.Services.AddDbContext<BikeStoreContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<StoreService>();
builder.Services.AddScoped<OrderService>();
#endregion

var app = builder.Build();

#region -------------------------------------------- Middleware pipeline
if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
	Console.WriteLine("******** Swagger enabled: http://localhost:5000/swagger (to set as default route: see launchsettings.json)");
	app.UseSwagger();
	app.UseRestClientGenerator(); //Note: must be used after UseSwagger
	app.UseSwaggerUI(x => x.SwaggerEndpoint( $"/swagger/{swaggerVersion}/swagger.json", swaggerTitle));
}

app.UseCors(corsKey);

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

//app.UseExceptionHandler(config =>
//{
//  config.Run(async context =>
//  {
//    context.Response.StatusCode = 500;
//    context.Response.ContentType = "application/json";
//    var error = context.Features.Get<IExceptionHandlerFeature>();
//    if (error != null)
//    {
//      await context.Response.WriteAsync(
//        $"Exception: {error.Error?.Message} {error.Error?.InnerException?.Message}");
//    }
//  });
//});

app.MapControllers();
#endregion

app.Run();
