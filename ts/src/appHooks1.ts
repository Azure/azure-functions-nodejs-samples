import { app, AppStartContext, AppTerminateContext } from '@azure/functions';

app.hook.appStart((context: AppStartContext) => {
    // add your logic here
});

app.hook.appTerminate((context: AppTerminateContext) => {
    // add your logic here
});
