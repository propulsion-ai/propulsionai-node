#!/usr/bin/env -S npm run tsn -T

import Propulsionai from 'propulsionai';

const propulsionai = new Propulsionai({
  bearerToken: process.env['PROPULSIONAI_BEARER_TOKEN'], // This is the default and can be omitted
});

async function mongo_query(parameters: any): Promise<any> {
  console.log(parameters);
  return `[{\"name\":\"Revenues\",\"description\":\"Revenues total result\",\"results\":[{\"date\":\"2023-01-01\",\"value\":7437.705499173913}],\"total\":7437.705499173913,\"sub_fields\":[{\"name\":\"Customization Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Other Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Management Fees\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Additional License Fees\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Events Management Retainer\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Onboarding Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Revenue\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Job Materials\",\"results\":[{\"date\":\"2023-01-01\",\"value\":3239.72}],\"total\":3239.72,\"sub_fields\":[{\"name\":\"Fountains and Garden Lighting\",\"results\":[{\"date\":\"2023-01-01\",\"value\":1089}],\"total\":1089},{\"name\":\"Plants and Soil\",\"results\":[{\"date\":\"2023-01-01\",\"value\":2120.72}],\"total\":2120.72},{\"name\":\"Sprinklers and Drip Systems\",\"results\":[{\"date\":\"2023-01-01\",\"value\":30}],\"total\":30}]},{\"name\":\"Labor\",\"results\":[{\"date\":\"2023-01-01\",\"value\":250}],\"total\":250,\"sub_fields\":[{\"name\":\"Installation\",\"results\":[{\"date\":\"2023-01-01\",\"value\":250}],\"total\":250},{\"name\":\"Maintenance and Repair\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0}]},{\"name\":\"Design income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":1987.5}],\"total\":1987.5,\"sub_fields\":[{\"name\":\"BLABLA (deleted)\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0}]},{\"name\":\"Discounts given\",\"results\":[{\"date\":\"2023-01-01\",\"value\":-89.5}],\"total\":-89.5},{\"name\":\"Fountains and Garden Lighting\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Landscaping Services\",\"results\":[{\"date\":\"2023-01-01\",\"value\":680}],\"total\":680},{\"name\":\"Other Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Pest Control Services\",\"results\":[{\"date\":\"2023-01-01\",\"value\":-30}],\"total\":-30},{\"name\":\"Raviraj\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Sales of Product Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":44}],\"total\":44},{\"name\":\"Services\",\"results\":[{\"date\":\"2023-01-01\",\"value\":503.55}],\"total\":503.55},{\"name\":\"Small business income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Unapplied Cash Payment Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Uncategorized Income\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Revenue stream 2\",\"results\":[{\"date\":\"2023-01-01\",\"value\":130.02526099281025}],\"total\":130.02526099281025},{\"name\":\"Revenue stream 3\",\"results\":[{\"date\":\"2023-01-01\",\"value\":100}],\"total\":100},{\"name\":\"New Sub Field (1)\",\"results\":[{\"date\":\"2023-01-01\",\"value\":0}],\"total\":0},{\"name\":\"Base License Fees\",\"results\":[{\"date\":\"2023-01-01\",\"value\":453.82424098}],\"total\":453.82424098},{\"name\":\"Revenue stream 1\",\"results\":[{\"date\":\"2023-01-01\",\"value\":168.58599720110382}],\"total\":168.58599720110382}]}]`;
}

async function main() {
  console.log('Running the model...');
  const modelRunResponse = await propulsionai.models.epAuto('d-qptg', {
    tools: [
      {
        type: 'function',
        function: {
          name: 'query_financial_report',
          description: 'Get the financial report data.',
          function: mongo_query,
          parameters: {
            type: 'object',
            properties: {
              scenarioId: {
                type: 'number',
                description: 'the unique id of the scneario that links to the financial report',
              },
              accountType: {
                type: 'string',
                description: 'the type of account to filter by',
                enum: ['income', 'expenses', 'costOfSales'],
              },
              fromDate: {
                type: 'string',
                description: "Date in the format of 'YYYY-MM-DD' to filter the transactions from",
              },
              toDate: {
                type: 'string',
                description: "Date in the format of 'YYYY-MM-DD' to filter the transactions till",
              },
            },
            required: ['scenarioId', 'accountType'],
          },
        },
      },
    ],
    tool_choice: 'auto',
    messages: [
      {
        role: 'system',
        content: `
            As a helpful assistant you have knowledge of profit and loss financial report and you are asked to:\n     search, calculate or test requested data.\n     If you get monthly grouped results, show them as a table grouped monthly.\n     The scenarioId is 301.\n     The current Date is 2024-06-24.\n     The Default currency is 'USD', all responses will be in '$', unless provided explicitly.\n     The Financial Quarters are Q1, Q2, Q3, Q4 and starts from January.\n     When asked for financial numbers, do not hallucinate. You have access to function calls,\n     use that to get the correct numbers before answering. If you don't have correct numbers or not 100% sure, say \"I don't have that information\"\n     Here is the list of the line items of the report grouped by their account type: Account type: otherExpenses. Its items are: Miscellaneous, Other expense 1, Other expense 2\nAccount type: expenses. Its items are: Consulting & Accounting, Bank Fees, Depreciation, General Expenses, Income Tax Expense, Incorporation Expense, Insurance, Rent, Subscriptions, Telephone & Internet, Travel - International, Travel - National, Wages and Salaries, Entertainment, Marketing & Advertising, Office Expenses, Legal expenses, Visa Expenses, Bonus, Amortization, Repairs and Maintenance, Printing & Stationery, Job Materials, Utilities, Advertising, Automobile, Bank Charges, Bookkeeper, Contractor, Equipment Rental, Fuel, Installation, Insurance, Job Expenses, Legal & Professional Fees, Maintenance and Repair, Maintenance and Repairs, Meals and Entertainment, Office Expenses, Plants and Soil, Rent or Lease, Unapplied Cash Bill Payment Expense, Expense 1, Expense 2\nAccount type: income. Its items are: Customization Revenue, Other Revenue, Management Fees, Additional License Fees, Events Management Retainer, Onboarding Revenue, Revenue, Job Materials, Labor, Design income, Discounts given, Fountains and Garden Lighting, Landscaping Services, Other Income, Pest Control Services, Raviraj, Sales of Product Income, Services, Small business income, Unapplied Cash Payment Income, Uncategorized Income, Revenue stream 2, Revenue stream 3, New Sub Field (1), Base License Fees, Revenue stream 1\nAccount type: otherIncome. Its items are: Interest EarnedAccount type: costOfSales. Its items are: Cost of Goods Sold, Cost of Goods Sold, Pizza pasta pasta, Cost of sales 1, Cost of sales 22\n     If you recognize a line item, use the account type for the function call.
        `,
      },
      {
        role: 'user',
        content: 'What are my revenues for Jan 2023?',
      },
    ],
    model: 'auto',
    stream: false,
    wait: true,
  });
  
  console.log('Model Run ID:', modelRunResponse.id);
  console.log('Task ID:', modelRunResponse.task_id);
  console.log('Choices:', modelRunResponse.choices);
  console.log('Tool Calls:', modelRunResponse.toolCalls);
}

main();
