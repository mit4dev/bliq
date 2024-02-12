## About

**Backend**: NestJS v10^

**Frontend**: NextJS v14.1^ w/ App Router

## Instructions

### Installing dependencies

To install dependencies, go to `./backend` and `./frontend` folders and run `npm i`.

```sh
# For backend
$ cd backend
$ npm i
```

```sh
# For frontend
$ cd frontend
$ npm i
```

## Running the apps

Run the apps using two separate terminals.

### Backend

Create `./backend/.env` file using the `./backend/.env.sample` content.

```sh
# Run following in the exact same order
$ cd backend
$ npm run build
$ npm run start:prod
```

You can access the backend via http://localhost:8080

### Frontend

Create `./frontend/.env` or `./frontend/.env.local` file using the `./frontend/.env.sample` content.

```sh
# Run following in the exact same order
$ cd frontend
$ npm run build
$ npm start
```

You can access the frontend via http://localhost:3000

## Testing

There are some tests in the Backend application. To run tests `cd` into `./backend`. Testing can be done via default NestJS scripts.

```sh
$ cd backend
# Possible scripts
$ npm test
$ npm run test:e2e
$ npm run test:cov
```

## Backend API

`/ping (GET)` - Returns `pong`

`/v1/aggregates (GET)` - Returns array of `RideInformation`'s

See below for API type definitions.

```typescript
export enum ProviderType {
  Uber = "UBER",
  Bolt = "BOLT",
}

/**
 * ISO 4217 compliant Currency codes
 */
export enum Currency {
  EUR = "EUR",
}

export enum PriceType {
  Fixed = "FIXED",
  Range = "RANGE",
}

type FixedPrice = {
  fixed: number;
  type: PriceType.Fixed;
  low?: never;
  high?: never;
};
type RangePrice = {
  low: number;
  high: number;
  type: PriceType.Range;
  fixed?: never;
};
export type RidePrice = FixedPrice | RangePrice;

export enum CarType {
  Eco = "ECO",
  Luxurious = "LUXURIOUS",
  Large = "LARGE",
}

export type RideInformation = {
  id: string;
  provider: ProviderType;
  price: RidePrice;
  currency: Currency;
  carType: CarType;
  durationMinutes: number;
};
```

## Notes on backend behavior

Backend application behavior can be configured using the `./backend/src/aggregator/constants/constants.provider.ts`. For details, see the JsDoc on the file.
PS: The reason for placing configuration in a NestJs value provider instead of an env file is to illustrate the usage of a value provider.

#### Providers can return empty responses! (to simulate errors)

When a simulated failure occurs for a provider request, an empty array is returned. Therefore, knowing that we have two Ride Platform Providers, there's a chance that an `/v1/aggregates` API response might be a totally empty array.

## Notes on frontend behavior

Frontend application can simulate error occurrence ie. when fetching the data from API.
This behavior can be controlled in `./frontend/src/app/components/RideOptionList.tsx#22`. Current error rate is `10%`. To disable, set as `-1`.

## Future notes

- Improve error handling by leveraging custom base exceptions and exception filters.
- Integrate with an open telemetry tool to trace overall system performance.
- Create a separate library or repository for common code, establishing a single source of truth and minimizing code duplication.

## Feature ideas

- An endpoint that returns VersionInfo to either trigger updates or disable usage on mobile apps.
- Enabling or disabling providers dynamically or on-demand.
- Ability to restrict usage in some part of the availability zones.
