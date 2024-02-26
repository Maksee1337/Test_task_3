const {client} = require('../config/db')
const isObject = (str) => str[0] >= 'A' && str[0] <= 'Z';
const getRates = (rates) => rates.map(el => nodeToObject(el));

function nodeToObject(node) {
    const result = {}
    node.children
        .filter(el => !isObject(el.name))
        .map(el => {
            const parts = el.name.split(':');
            result[parts[0]] = parts[1].trim().replaceAll("'", "\''")
            return result;
        });
    return result;
}

const getDepartment = (employee) => employee.children.find(el => el.name === 'Department');
const getStatements = (employee, employeeId) => {
    const statements = employee.children.filter(el => el.name === 'Salary')[0].children;
    return statements.map(el => {
        const {id, date, amount} = nodeToObject(el);
        return `(${id},${employeeId},'${date}',${amount})`;
    });
}

/**
 * Get amount in USD
 * Here we cat get currency rates from any source
 */
function getAmountInUSD(date, value, sign, rates) {
    if (sign === 'USD') return value;
    const rate = rates.find(el => {
          return el.date === date && el.sign === sign;
    });
    return (value * rate.value);
}

const getDonations = (employee, employeeId, rates) => {
    const donations = employee.children.filter(el => el.name === 'Donation');
    return donations.map(el => {
        const {id, date, amount} = nodeToObject(el);
        const match = amount.match(/([\d.]+) ([A-Z]{3})/);
        const amountInUsd = getAmountInUSD(date, match[1], match[2], rates);
        return `(${id},${employeeId},'${date}',${amountInUsd})`;
    });
}

async function saveEList(client, eList, rates) {
    const departments = new Set();
    const statements = []
    const employees = [];
    const donations = [];
    eList.map(el => {
        const department = nodeToObject(getDepartment(el));
        departments.add(`('${department.id}','${department.name}')`);
        const {id, name, surname} = nodeToObject(el);
        statements.push(getStatements(el, id));
        const donation = getDonations(el, id, rates);
        if (donation.length > 0) {
            donations.push(donation);
        }

        employees.push(`(${id},'${name}','${surname}')`);
    })

    await client.query(`INSERT INTO employees (id, name, surname) VALUES ${employees.join(',')};`);
    await client.query(`INSERT INTO departments (id, name) VALUES ${Array.from(departments).join(',')};`);
    await client.query(`INSERT INTO statements (id, employee_id, date, amount) VALUES ${statements.join(',')};`);
    await client.query(`INSERT INTO donations (id, employee_id, date, amount_in_usd) VALUES ${donations.join(',')};`);
}

module.exports = function (data) {
    const eList = data.children[0].children;
    const rates = getRates(data.children[1].children).sort((a, b) => a.date - b.date);

    client.connect().then(async () => {
        try {
            await client.query('BEGIN');
            await saveEList(client, eList, rates);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e
        }
        client.end()
    });

}
