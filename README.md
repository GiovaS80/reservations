<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
Esigenza
Un piccolo studio Medico necessita della creazione di un sistema automatico per gestire le prenotazioni.
Per farlo ha deciso di avvalersi di una WebApp disponibile pubblicamente sul web, che grazie all’utilizzo di alcune API, è in grado di salvare/ricevere/eliminare le prenotazioni per i singoli pazienti.

- Per ogni singolo giorno, il numero massimo di prenotazioni possibili dai vari pazienti è 5
- Un paziente è unicamente riconosciuto all’interno del sistema attraverso il suo Codice Fiscale
- Un paziente può avere una sola prenotazione attiva alla volta
- Le prenotazioni vengono riconosciute all’interno del sistema attraverso la generazione di un Ticket univoco alfanumerico
- Per garantire un minimo di sicurezza al paziente, una prenotazione può essere eliminata solo dal paziente stesso, utilizzando il Codice Fiscale, il Ticket univoco e la data della prenotazione effettuata

Gli endpoint che il server deve necessariamente esporre sono:

[GET] /reservations
Ritorna la lista di tutte le prenotazioni effettuate, da tutti gli utenti, ordinata per data di prenotazione

[GET] /reservations?date=<YYYY-MM-DD>
Ritorna la lista di tutte le prenotazioni effettuate per la data richiesta

[GET] /reservations?fiscalCode=<YYYYYYYYYY>
Ritorna le prenotazioni effettuate dall’utente che corrisponde al codice fiscale inviato

[GET] /reservations?ticket=<XXXXXXXXXX>
Ritorna la singola prenotazione che corrisponde al Ticket inviato

[POST] /reservations?date=<YYYY-MM-DD>&fiscalCode=<YYYYYYYYYY>
Richiede l’inserimento di una nuova prenotazione a sistema. Se il procedimento va a buon fine, viene ritornato il Ticket univoco della prenotazione

[DELETE] /reservations?date=<YYYY-MM-DD>&fiscalCode=<YYYYYYYYYY>&ticket=<XXXXXXXXXX>
Richiede l’eliminazione di una prenotazione effettuata


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
