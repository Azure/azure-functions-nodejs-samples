import { app, InvocationContext, WarmupContextOptions } from "@azure/functions";

export async function warmupFunction(warmupContext: WarmupContextOptions, context: InvocationContext): Promise<void> {
    context.log('Function App instance is warm.');
}

app.warmup('warmup', {
    handler: warmupFunction,
});
