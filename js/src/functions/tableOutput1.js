const { app, output } = require('@azure/functions');

const tableOutput = output.table({
    tableName: 'Person',
    connection: 'MyStorageConnectionAppSetting',
});

app.http('httpTrigger1', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [tableOutput],
    handler: async (request, context) => {
        const rows = [];
        for (let i = 1; i < 10; i++) {
            rows.push({
                PartitionKey: 'Test',
                RowKey: i.toString(),
                Name: `Name ${i}`,
            });
        }
        context.extraOutputs.set(tableOutput, rows);
        return { status: 201 };
    },
});
