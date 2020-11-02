## How to run

run the following steps:

1. Create .env file in payroll folder
2. `docker-compose build`
3. `docker-compose up`

### Run test cases

run the following steps:

1. `docker exec -it payroll_demo bash`
2. `npm run test`

## Sample Request

Use following Postman Collection to run the test sample
https://www.getpostman.com/collections/67c098fa8f0087907203
Note: If you received 500 error, try to update body raw's type to JSON instead Text.

## Calculation Assumption

1. No other factor contributing to income tax calculation i.e residency status
2. Annual salary does not change throughout the year, since it was pro-rated monthly
