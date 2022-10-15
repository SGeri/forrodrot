<p align="center">
   <br/>
   <a href="https://forrodrot.com" target="_blank"><img width="200px" src="https://i0.wp.com/noar.hu/wp-content/uploads/2022/10/attesztologo.png?ssl=1" /></a>
   <h2 align="center">Forródrót</h2>
   <p align="center">
   Minden közoktatással kapcsolatos polgári kezdeményezés egy helyen.
   </p>
   <p align="center" style="align: center;">
      <a href="https://github.com/SGeri/forrodrot">
        <img alt="stars" src="https://img.shields.io/github/stars/SGeri/forrodrot?style=for-the-badge">
      </a>
      <a href="https://github.com/SGeri/forrodrot">
        <img src="https://img.shields.io/badge/version-1.0.0-<COLOR>?style=for-the-badge" alt="Bundle Size"/>
      </a>
      <a href="https://github.com/SGeri/forrodrot">
        <img src="https://img.shields.io/badge/node-16+-blue?style=for-the-badge" alt="Downloads" />
      </a>
      <a href="https://github.com/SGeri/forrodrot">
        <img src="https://img.shields.io/github/license/SGeri/forrodrot?style=for-the-badge" alt="ISC" />
      </a>
   </p>
</p>

## Áttekintés

A Forródrót az első webes kezdeményezés, amely össze kívánja gyűjteni az összes közoktatással kapcsolatos polgári kezdeményezést.

Az oldalon megtalálhatóak a legfrissebb események / rendezvények / találkozók a témával kapcsolatban, informátoraink az ország minden tájáról (Budapest és nagyobb vidéki városok) és az oldal szerkesztői aktuálisan tartják az oldal tartalmait.

A projekt teljes mértékben nyílt forráskódú, minden hozzájárulást szívesen látunk!

### Felhasznált technológiák

Az oldal a [NextJS](https://nextjs.org) keretrendszert használja a [NextAuth](https://next-auth.js.org) könyvtárral a hitelesítéshez. Az API [Prisma](https://www.prisma.io) ORM-et használ a séma migrálásához és az adatbázisban lévő adatok egyszerű lekérdezéséhez és mutálásához. Front-end oldalon a [Mantine](https://mantine.dev) UI Framework NextJS portját használjuk, emellett az oldalon megjelenő térkép komponensekért a [Leaflet](https://react-leaflet.js.org) felel.

## Hozzájárulás

### 0. Előfeltételek

- [NodeJS 16+](https://nodejs.org/en/download/)

### 1. A repository másolása és függőségek telepítése

```
git clone https://github.com/SGeri/forrodrot.git
cd forrodrot
npm install
```

### 2. A környezeti változók konfigurálása

Másold a példa .env.example fájlt a gyökérkönyvtárba .env néven.

```
cp .env.example .env
```

Majd add meg a környezeti változókat!

#### Adatbázis

Az adatbázisséma migrálásához a [Prisma](https://www.prisma.io) ORM-et használjuk.
A .env fájl kitöltése után az alábbi parancsokat futtasd:

```bash
npx prisma migrate reset   <- az adatbázis tisztítása
npx prisma migrate dev     <- séma migrálása fejlesztési környezetbe
```

- Részletek: [Prisma - Getting Started](https://www.prisma.io/docs/getting-started)

### 3. Az applikáció indítása

A webhely helyi futtatásához használd a következőt:

```
npm run dev
```

## License

ISC
