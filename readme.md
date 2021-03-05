 # Sött & Gött
### Skapat av Robin Holgersson, Joakim Pfannenstill, Sebastian Borg, Anton Månsson

 #### Språk SQL, PHP, JS, CSS, HTML


### ProjektIdé
Det ska öppna en ny godisbutik i stan som vill ha en webshop för att kunna sälja godis,läsk och snacks. Namnet är Sött & Gött och vi ska bli det som foodora är för mat fast för godis, snacks och läsk. Med andra ord, allt som krävs för att rädda spelkvällen, den ensamma gamern eller Netflix hänget. Vi vill utöver vårt vanliga sortiment även sälja färdiga paket speciellt anpassade för de olika hemma stunder livet har att erbjuda.

### Adminpanel
Vi har byggt en adminspanel där det finns möjlighet att uppdatera/ta bort samt lägga till produkter från databasen
### Uppdatera 
-> ändra namn,pris,beskrivning,lagersaldo,kategori.
### Ta bort
-> tar bort produkt från databas.
### Lägg till
-> Lägger till ny produkt med de värden du fyller i, namn, pris, beskkrivning, bild, katergori.

Det finns även möjlighet att ändra orderstatus till skickad, genom en tabell som hämtar varje order som är lagd.
Det finns även möjlighet att göra användare till Admin, samt ta bort de som Admin. Genom en tabell som hämtar varje order som är lagd.

### Nyhetsbrev
Som utloggad kan du registrera dig för nyhetsbrev genom att fylla i namn och email på startsidan.
Vid registrering utav konto kan du även registrera dig till nyhetsbrev, där läggs userid till istället för namn och email i databas. Ifall du inte registerar dig för nyhetsbrev vid registering kan du lätt göra det vid startsidan samt kundvagnssidan. Utskick utav nyhetsbrev blev bort prioriterat för andra mer viktiga funktioner.

### Erbjudande
Vi hade en idé med att ha erbjudanden på startsidan i form utav paket. En funktion som blev betydligt större än vad vi tänkte från början, vilket satte käppar i hjulet. Här fick vi verkligen en känsla utav hur viktigt det är med ett gediget förarbete, vi tar stor lärdom utav detta. I nuläget kan man tyvärr inte ändra de befintliga erbjudanden, pga tidsbrist.


* Alla sidor skall vara responsiva. (G) 
    * Med hjälp av mediaquery
* Arbetet ska implementeras med objektorienterade principer. (G)
    * Vi har använd oss utav klasser samt repo för att skapa en bra struktur
* Skapa ett konceptuellt ER diagram, detta ska lämnas in vid idégodkännandet G)
    * ER-diagrammet finns i githubrepo
* Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G)
    * hänvisa till stycke projektide högst upp
* All data som programmet utnyttjar ska vara sparat i en MYSQL databas (produkter, beställningar, konton mm) (G)
    * Check, se bifogad databas
* Det ska finnas ett normaliserat diagram över databasen i gitrepot G)
    * Check, se bifogat diagram
* Man ska kunna logga in som administratör i systemet (G)
    * Admin loggar in på samma sätt som en user gör via ett login form
* Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG)  
    * Vi valde att inte ha möjligheten till kunna registrera sig som admin, men man kan användare admin rättigheter i adminpanelen
* En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG)
    * hänvisar till  föregående svar
* Inga Lösenord får sparas i klartext i databasen (G)
    * Vi hashar alla lösenord
* En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G)
    * När du som inloggad kund slutför ditt köp så ändras lagersaldot i databasen
* Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G)
    * Check, hänvisar till stycke adminpanel i början utav dokumentet
* Administratörer ska kunna se en lista på alla gjorda beställningar (G)
    * Check, hänvisar till stycke adminpanel  i början utav dokumentet
* Administratörer ska kunna markera beställningar som skickade (VG)
    * Check, hänvisar till stycke adminpanel i början utav dokumentet
* Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G)
    * En produkt tillhör endast en kategori, men vi har löst detta genom vår erjbudande tabell.
* Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G)
    * Det kan man genom att klicka de olika kategori valen i headern
* Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i session på servern (G)
    * Vi har valt så att användaren behöver logga in för att lägga till produkter i kundvagnen, kundvagnen sparas i databasen. Vilket gör det mer användarvänligt då du kan fortsätta din beställning på en annan enhet.
* Man ska från hemsidan kunna skriva upp sig för att få butikens nyhetsbrev genom att ange sitt namn och epostadress (G)
    * Check, hänvisar till stycket nyhetsbrev 
* När man gör en beställning ska man också få chansen att skriva upp sig för nyhetsbrevet (VG).
    * Check  hänvisa till nyhetsbrev i början utav dokumentet
* När besökare gör en beställning ska hen få ett lösenord till sidan där man kan logga in som kund. Det är ok att spara all kundinformation i användartabellen, ni behöver alltså inte ha en separat costumer tabell om inloggning finns (VG)
    * Man måste vara inloggad för att kunna lägga en order
* När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)
    * Check, det hittar du på mina sidor under ordrar
* Som inloggad kund ska man kunna markera sin beställning som mottagen (VG)
    * Check, det hittar du på mina sidor under ordrar
* Administratörer ska kunna se en lista över personer som vill ha nyhetsbrevet och deras epost adresser (G)
    * det hittar du vid adminpanelen under UserNewsLetter
* Besökare ska kunna välja ett av flera fraktalternativ (G)
    * När du ska slutföra ditt köp i kundkorgen så kan du välja mellan tre olika fraktalternativ. 
* Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
    * De olika fraktalternativen hämtas från databasen genom ett api.
* Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)
    * Check, hänvisar till adminpanelen
* Administratörer ska kunna skicka nyhetsbrev från sitt gränssnitt, nyhetsbrevet ska sparas i databasen samt innehålla en titel och en brödtext (VG)
    * Nej hänvisar till stycke om nyhetsbrev
* Administratörer ska kunna lägga till och ta bort produkter (VG)
    * Check, hänvisar till stycke om Adminpanel