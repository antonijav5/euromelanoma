using Microsoft.OpenApi.Models;
using System.Reflection;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);

// U konfiguraciju aplikacije dodaj appsettings.json u zavisnosti od Environment-a (Development ili Production)
IConfigurationRoot? config = new ConfigurationBuilder()
                                .AddJsonFile("appsettings.json")
                                .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
                                .Build();

// Uzmi konekcioni string iz odgovarajuceg appsettings.json-a
string? defaultConnectionString = builder.Configuration.GetConnectionString("Default");

// Sinhronizovane operacije nisu dozvoljene. Pozovite ReadAsync ili postavite AllowSynchronousIO na true umesto toga.
builder.Services.Configure<IISServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});


// Dodaj servis za koriscenje kontrolera u objekat bilder aplikacije
builder.Services.AddControllers();



// Dodaj servis za automatsko generisanje Swagger dokumentacije u objekat bilder aplikacije
builder.Services.AddEndpointsApiExplorer();

// Ukljuci XML komentare iznad metoda u Swagger dokumentaciju u objekat bilder aplikacije
builder.Services.AddSwaggerGen(config =>
{
    // config.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
    config.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "V1" });
});

// Ukljuci bazu podataka u objekat bilder aplikacije
//builder.Services.AddDbContext<GlobosDbContext>(options => options.UseSqlServer(defaultConnectionString));

// Dozvoli maksimalnu velicinu fajla koju prima MultipartFormData
builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = long.MaxValue;
});

// Ova metoda se poziva nad instancom WebApplicationBuilder kako bi se stvorila konačna instanca WebApplication - aplikacije.
// Metoda izvrsava sva podešavanja, inicijalizacije servisa i drugih komponenata, pre nego što se aplikacija zaista pokrene
WebApplication? app = builder.Build();


// Samo ako je Environment Development koristi interfejs Swagger-a
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(config =>
    {
        config.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1");
    });
}


// Ukljuci servis za autentifikaciju i autorizaciju
app.UseAuthorization();


// Ukljuci servis CORS za prevazilazenje "the same origin policy" problema - da server kome je poslat zahtev dozvoli Cross Domain DATA Request.
// Ne koristiti metode Allow_ vec eksplicitno odrediti koji domeni mogu da pozivaju api i koje HTTP atribute mogu da koriste u metodama zbog bezbednosti
app.UseCors(x => x
                  .AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader());


// Dodaj posrednicki delegat koji kreira pipeline
app.MapControllers();

// Pokreni api
app.Run();
