const { app, output } = require('@azure/functions');

const sqlOutput = output.sql({
    commandText: 'dbo.ToDo',
    connectionStringSetting: 'SqlConnectionString',
});

app.http('httpTrigger1', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [sqlOutput],
    handler: async (request, context) => {
        context.log('HTTP trigger and SQL output binding function processed a request.');

        const body = await request.json();
        context.extraOutputs.set(sqlOutput, body);
        return { status: 201 };
    },
});
