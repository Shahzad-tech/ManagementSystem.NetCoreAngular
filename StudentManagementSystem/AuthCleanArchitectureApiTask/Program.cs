using Application.Extensions;
using Persistance.Extensions;


var builder = WebApplication.CreateBuilder(args);



//builder.Services.AddFluentValidation(   call exception middleware from here
//    fv => {
//        fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
//    }
//);

builder.Services.AddControllers();


//var logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).Enrich.FromLogContext().CreateLogger(); //switch
//builder.Logging.ClearProviders(); //switch
//builder.Logging.AddSerilog(logger);//switch

//builder.Services.ConfigureEmailSerices(builder.Configuration);
builder.Services.ConfigurePersistance(builder.Configuration);
builder.Services.ConfigureJWTinPersistance(builder.Configuration); // <JWT Authentication>
//builder.Services.AddControllers();
builder.Services.ConfigureApplication();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());


app.UseHttpsRedirection();
//app.ConfigureExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();
app.UseDefaultFiles();
app.UseStaticFiles();
//app.UseExceptionHandler("/Error");

app.MapControllers();

app.Run();
