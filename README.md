# Zápisky: Co je to Prisma a jak funguje

## Základní definice
Prisma je moderní ORM (Object-Relational Mapping) nástroj. V architektuře aplikace slouží jako softwarová mezivrstva, která propojuje aplikační logiku (backend psaný v TypeScriptu) se samotným databázovým systémem (např. SQLite, PostgreSQL).

## Tři hlavní pilíře fungování

### 1. Prisma Schema (`schema.prisma`)
Proces vývoje začíná definicí schématu. Pomocí deklarativní syntaxe se definují datové modely (tabulky) a jejich atributy (sloupce), včetně přesných datových typů (např. `Int`, `String`) a omezení (např. primární klíče).

### 2. Prisma Migrate
Modul odpovědný za synchronizaci schématu s fyzickou databází. Nástroj analyzuje soubor `schema.prisma` a generuje nízkoúrovňové DDL (Data Definition Language) SQL příkazy, například `CREATE TABLE`. Tyto příkazy exekuuje přímo na databázovém serveru nebo souboru.

### 3. Prisma Client
Klíčový nástroj pro běh aplikace (Runtime). Příkaz `prisma generate` vytvoří v adresáři `node_modules` typově striktního klienta na základě aktuálního schématu. 

Při samotném zápisu kódu se nevyužívají standardní textové SQL dotazy (např. `INSERT INTO Item...`). Databázové operace se provádějí voláním asynchronních metod nad vygenerovaným objektem:
* Pro čtení: `await prisma.item.findMany()`
* Pro zápis: `await prisma.item.create()`

Prisma Client tyto objektové metody interně zkompiluje do platné SQL syntaxe `=>` naváže spojení s databází a odešle požadavek `=>` přijme surová relační data a transformuje je zpět na standardní datové struktury (objekty a pole) použitelné v TypeScriptu.

## Technické výhody
* **Striktní typová kontrola (Type Safety):** Díky plné integraci s TypeScriptem hlásí kompilátor chyby ještě před spuštěním kódu, pokud se vývojář pokusí zapsat nesprávný datový typ.
* **Automatické doplňování kódu (IntelliSense):** Vývojové prostředí přesně zná strukturu tabulek a nabízí existující metody a sloupce přímo během psaní.
* **Abstrakce datové vrstvy:** Programátor manipuluje s daty pomocí standardních programovacích konstruktů bez nutnosti implementovat manuální SQL spojení.