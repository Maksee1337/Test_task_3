const {client} = require('../config/db')
const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const query = `
with t1 as (select e.name,
                   e.surname,
                   d.employee_id,
                   SUM(d.amount_in_usd) as amount_in_usd
            from employees e
                     join donations d on e.id = d.employee_id
            group by d.employee_id, e.surname, e.name),
     t2 as (select
                t1.*,
                case when t1.amount_in_usd < 100 then 0 else t1.amount_in_usd / SUM(t1.amount_in_usd) OVER () * 10000 end as reward
            from t1)

select * from t2;
`;

    const results = await client.query(query);
    res.json(results.rows);

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    client.connect().then(() => {
        console.log('Connected to DB');
    });
});
