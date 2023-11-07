import { app, HttpRequest, HttpResponseInit, InvocationContext, output } from '@azure/functions';

const tableOutput = output.table({
    tableName: 'Person',
    connection: 'MyStorageConnectionAppSetting',
});

interface PersonEntity {
    PartitionKey: string;
    RowKey: string;
    Name: string;
}

export async function httpTrigger1(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const rows: PersonEntity[] = [];
    for (let i = 1; i < 10; i++) {
        rows.push({
            PartitionKey: 'Test',
            RowKey: i.toString(),
            Name: `Name ${i}`,
        });
    }
    context.extraOutputs.set(tableOutput, rows);
    return { status: 201 };
}

app.http('httpTrigger1', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [tableOutput],
    handler: httpTrigger1,
});
