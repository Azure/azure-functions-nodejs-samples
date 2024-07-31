const { AzureFunctionsInstrumentation } = require('@azure/functions-opentelemetry-instrumentation');
const { getNodeAutoInstrumentations, getResourceDetectors } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPLogExporter } = require('@opentelemetry/exporter-logs-otlp-http');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { detectResourcesSync } = require('@opentelemetry/resources');
const { LoggerProvider, SimpleLogRecordProcessor } = require('@opentelemetry/sdk-logs');
const { NodeTracerProvider, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-node');

const resource = detectResourcesSync({ detectors: getResourceDetectors() });

const tracerProvider = new NodeTracerProvider({ resource });
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter()));
tracerProvider.register();

const loggerProvider = new LoggerProvider({ resource });
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new OTLPLogExporter()));

registerInstrumentations({
    tracerProvider,
    loggerProvider,
    instrumentations: [getNodeAutoInstrumentations(), new AzureFunctionsInstrumentation()],
});
