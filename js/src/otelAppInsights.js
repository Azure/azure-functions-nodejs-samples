const { AzureFunctionsInstrumentation } = require('@azure/functions-opentelemetry-instrumentation');
const { AzureMonitorLogExporter, AzureMonitorTraceExporter } = require('@azure/monitor-opentelemetry-exporter');
const { getNodeAutoInstrumentations, getResourceDetectors } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { detectResourcesSync } = require('@opentelemetry/resources');
const { LoggerProvider, SimpleLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { NodeTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');

const resource = detectResourcesSync({ detectors: getResourceDetectors() });

const tracerProvider = new NodeTracerProvider({ resource });
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new AzureMonitorTraceExporter()));
tracerProvider.register();

const loggerProvider = new LoggerProvider({ resource });
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new AzureMonitorLogExporter()));

registerInstrumentations({
    tracerProvider,
    loggerProvider,
    instrumentations: [getNodeAutoInstrumentations(), new AzureFunctionsInstrumentation()],
});
