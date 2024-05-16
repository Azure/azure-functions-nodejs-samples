import { app, LogLevel } from '@azure/functions';
import { context as otelContext, propagation } from '@opentelemetry/api';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { getNodeAutoInstrumentations, getResourceDetectors } from '@opentelemetry/auto-instrumentations-node';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { detectResourcesSync } from '@opentelemetry/resources';
import { LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { NodeTracerProvider, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';

const resource = detectResourcesSync({ detectors: getResourceDetectors() });

const tracerProvider = new NodeTracerProvider({ resource });
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter()));
tracerProvider.register();

const loggerProvider = new LoggerProvider({ resource });
loggerProvider.addLogRecordProcessor(new SimpleLogRecordProcessor(new OTLPLogExporter()));

registerInstrumentations({ tracerProvider, loggerProvider, instrumentations: [getNodeAutoInstrumentations()] });

// NOTE: The below code will soon be a part of a new package `@opentelemetry/instrumentation-azure-functions`
// See here for more info: https://github.com/Azure/azure-functions-nodejs-library/issues/245
app.setup({ capabilities: { WorkerOpenTelemetryEnabled: true } });

const logger = loggerProvider.getLogger('default');
app.hook.log((context) => {
    logger.emit({
        body: context.message,
        severityNumber: toOtelSeverityNumber(context.level),
        severityText: context.level,
    });
});

app.hook.preInvocation((context) => {
    context.functionHandler = otelContext.bind(
        propagation.extract(otelContext.active(), {
            traceparent: context.invocationContext.traceContext.traceParent,
            tracestate: context.invocationContext.traceContext.traceState,
        }),
        context.functionHandler
    );
});

function toOtelSeverityNumber(level: LogLevel): SeverityNumber {
    switch (level) {
        case 'information':
            return SeverityNumber.INFO;
        case 'debug':
            return SeverityNumber.DEBUG;
        case 'error':
            return SeverityNumber.ERROR;
        case 'trace':
            return SeverityNumber.TRACE;
        case 'warning':
            return SeverityNumber.WARN;
        case 'critical':
            return SeverityNumber.FATAL;
        default:
            return SeverityNumber.UNSPECIFIED;
    }
}
