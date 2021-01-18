# MiniCRM
Menadzer komapnija i zaposlenih

<h3>Pokretanje i podesavanje aplikacije</h3>

**WAMP/XAMP/LAMP MORAJU BITI POKRENUTI KAKO BI APLIKACIJA FUNKCIONISALA**
1. Pozicionirajte se u folder gde zelite da instalirate aplikaciju (u terminalu).
2. Instalirajte aplikaciju pomocu komande : <strong>git clone https://github.com/usanzadunje/MiniCRM</strong>
3. Pozicionirajte se unutar novonastalog foldera (<strong>cd MiniCRM</strong>)
4. Kreirajte bazu podataka kopiranjem i pokretanjem koda iz fajla baza.sql
5. Izvrsite sledecu komandu <strong>cp env-copy.js env.js</strong>
6. Otvorite novonastali fajl env.js pomocu bilo kog text editora (komanda <strong>notepad env.js</strong> otvara u Notepad-u)
7. Popunite sva odgovarajuca polja vrednostima koja se zahtevaju vasim vrednostima.
8. Nakon toga potrebno je instalirati sve dependency-je komandom <strong>npm install</strong>
9. Pokretanje aplikacije mozete izvrsiti komandom <strong>npm run start</strong>
10. Aplikaciju mozete videti na adresi : <a href="http://127.0.0.1:8000">127.0.0.1:8000</a>

Za testiranje aplikacije mozete koristiti 2 naloga koja su vec na raspolaganju:
1. admin@admin.com | 123
2. regular@regular.com | 123

Svaki novokreirani nalog ce zahtevati verifikaciju e-mail adrese tako da je potrebno uneti postojecu e-mail adresu.

<p style="font-weight: bold; color: red;">Ukoliko verifikacija mail-a ne radi znaci da je neispravan nalog sa koga se salje mail, mozete koristiti moj koji sam postavio u fajlu gde se nalazi link do git repozitorijuma na DropBox-u</p>
