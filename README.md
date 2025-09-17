# Euromelanoma Portal - Master Rad

Ovaj projekat predstavlja web portal za procenu rizika od melanoma i zakazivanje dermatoloških pregleda, razvijen kao deo master rada.

## 🚀 Pokretanje aplikacije

### Preduslovi
- Docker Desktop
- Docker Compose

### Koraci za pokretanje

1. **Klonirajte/ekstraktujte projekat** u željeni folder

2. **Environment konfiguracija**
   - U nastavku email-a nalazi se `.env` fajl
   - Sačuvajte `.env` fajl u root folder projekta (na istom nivou gde se nalazi `docker-compose.yml`)
   
   Struktura foldera treba da izgleda ovako:
   ```
   euromelanoma/
   ├── euromelanoma_api/
   ├── euromelanoma_front/
   ├── database/
   ├── docker-compose.yml
   └── .env                    
   ```

3. **Pokretanje sistema**
   ```bash
   docker-compose up -d
   ```

4. **Čekanje da se sistem pokrene** (može potrajati 2-3 minuta pri prvom pokretanju)

5. **Pristup aplikaciji**
   - **Frontend:** http://localhost:4200
   - **Backend API/Swagger:** http://localhost:5000/swagger
   - **Baza podataka:** localhost,1433 (korisnik: sa, lozinka: nalazi se u .env fajlu)

## 📋 Test nalozi

Sistem automatski kreira sledeće test naloge:

- **Administrator:**
  - Username: `admin`
  - Password: `Lozinka_123`

- **Lekar:**
  - Username: `jelena01`
  - Password: `Lozinka_123!`

- **Pacijent:**
  - Username: `anci`
  - Password: `Lozinka_123!`

## 🔧 Upravljanje sistemom

### Osnovne komande
```bash
# Pokretanje
docker-compose up -d

# Zaustavljanje
docker-compose down

# Pregled statusa
docker-compose ps

# Pregled logova
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restartovanje pojedinačnih komponenti
```bash
# Restart backend-a (nakon izmena koda)
docker-compose restart backend

# Rebuild i restart frontend-a
docker-compose build frontend
docker-compose up -d frontend
```

## 🗄️ Baza podataka

- **Server:** localhost,1433
- **Database:** EUROMELANOMA
- **Username:** sa
- **Password:** nalazi se u .env fajlu

Baza se automatski kreira sa potrebnim tabelama i test podacima pri prvom pokretanju.

## 📧 Email funkcionalnost

Sistem koristi SendGrid za slanje email-ova. Ukoliko se ne postaviti SendGrid API ključ, sistem će raditi normalno ali email-ovi neće biti poslati (biće samo logovani).

## 🏗️ Arhitektura sistema

Sistem se sastoji od:
- **Frontend:** Angular aplikacija (port 4200)
- **Backend:** .NET 8 Web API (port 5000)
- **Baza:** MS SQL Server (port 1433)

Svi servisi su kontejnerizovani i komuniciraju preko Docker mreže.

## 🔍 Rešavanje problema

### Ako aplikacija ne radi:

1. **Proverite Docker status:**
   ```bash
   docker-compose ps
   ```

2. **Pogledajte logove:**
   ```bash
   docker-compose logs
   ```

3. **Restartujte sistem:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

4. **Očistite Docker cache (ako je potrebno):**
   ```bash
   docker system prune -f
   docker-compose build --no-cache
   docker-compose up -d
   ```

### Česti problemi:
- **Port zauzet:** Proverite da portovi 4200, 5000, i 1433 nisu zauzeti
- **.env fajl:** Proverite da je `.env` fajl na pravom mestu
- **Windows Docker:** Možda treba da omogućite file sharing u Docker Desktop settings

**Napomena:** `.env` fajl se nalazi u prilogu email-a iz bezbednosnih razloga i ne treba da bude deo javnog repositorijuma.
