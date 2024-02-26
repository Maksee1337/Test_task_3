# AYA test task solution
task: https://drive.google.com/drive/folders/1VJkrR3ne1l5CD7BIBuoLxCNyZL8-D3uk

## How to run
1. `docker-compose -f ./postgres/docker-compose.yml up -d`
2. `npm install`
3. `npm run createDB`
4. `npm run task1`
5. `npm run task2`

Open http://localhost:3000/ in browser
### Questions/Answers

1. How to change the code to support different file versions?
   - We should make a function that loads data from another format and make list in format we need.    

2. How the import system will change if data on exchange rates disappears from the file, and it will need to be received asynchronously (via API)?
   - we can get exchange rates in getAmountInUSD function in saveObj.js from any source.

3. In the future the client may want to import files via the web interface, how can the system be modified to allow this?
   - we need create endpoint that receives file, than parse it and insert data to database.
