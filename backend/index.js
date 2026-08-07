const express = require('express');
const cors = require('cors');
const {
    OPCUAClient,
    MessageSecurityMode,
    SecurityPolicy,
    AttributeIds,
    DataType,
} = require("node-opcua");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const endpointUrl = "opc.tcp://172.28.76.226:53881/UA/VFDGateway";

// ─── Logger con colores ANSI ────────────────────────────────────────────────────
const RESET   = "\x1b[0m";
const BOLD    = "\x1b[1m";
const DIM     = "\x1b[2m";
const CYAN    = "\x1b[36m";
const GREEN   = "\x1b[32m";
const YELLOW  = "\x1b[33m";
const RED     = "\x1b[31m";
const MAGENTA = "\x1b[35m";
const WHITE   = "\x1b[37m";

let writeCounter = 0;

function timestamp() {
    return new Date().toISOString().replace("T", " ").replace("Z", "");
}

function log(level, msg) {
    const colors = { INFO: CYAN, OK: GREEN, WARN: YELLOW, ERROR: RED, CONN: MAGENTA };
    const color = colors[level] || WHITE;
    console.log(`${DIM}[${timestamp()}]${RESET} ${color}${BOLD}[${level}]${RESET} ${msg}`);
}

function logWriteStart(writeId, nodeId, dataType, value) {
    const line = "─".repeat(60);
    console.log(`\n${CYAN}${line}${RESET}`);
    console.log(`${BOLD}${CYAN}  ✦ ENVÍO OPC UA  #${writeId}${RESET}`);
    console.log(`${CYAN}${line}${RESET}`);
    console.log(`  ${DIM}Timestamp   :${RESET} ${WHITE}${timestamp()}${RESET}`);
    console.log(`  ${DIM}Endpoint    :${RESET} ${WHITE}${endpointUrl}${RESET}`);
    console.log(`  ${DIM}NodeId      :${RESET} ${YELLOW}${nodeId}${RESET}`);
    console.log(`  ${DIM}DataType    :${RESET} ${MAGENTA}${dataType}${RESET}`);
    console.log(`  ${DIM}Valor       :${RESET} ${BOLD}${WHITE}${value}${RESET}`);
}

function logWriteResult(writeId, nodeId, statusName, elapsedMs, ok) {
    const icon  = ok ? `${GREEN}✔` : `${RED}✘`;
    const color = ok ? GREEN : RED;
    console.log(`  ${DIM}Estado OPC  :${RESET} ${icon} ${color}${BOLD}${statusName}${RESET}`);
    console.log(`  ${DIM}Latencia    :${RESET} ${WHITE}${elapsedMs} ms${RESET}`);
    console.log(`  ${DIM}Write ID    :${RESET} ${DIM}#${writeId} — ${nodeId}${RESET}`);
    const line = "─".repeat(60);
    console.log(`${ok ? GREEN : RED}${line}${RESET}\n`);
}

function logWriteError(writeId, nodeId, err) {
    console.log(`  ${RED}✘ ERROR AL ESCRIBIR${RESET}`);
    console.log(`  ${DIM}NodeId      :${RESET} ${nodeId}`);
    console.log(`  ${DIM}Mensaje     :${RESET} ${RED}${err.message}${RESET}`);
    console.log(`  ${DIM}Write ID    :${RESET} ${DIM}#${writeId}${RESET}`);
    const line = "─".repeat(60);
    console.log(`${RED}${line}${RESET}\n`);
}

// ─── OPC UA Client ─────────────────────────────────────────────────────────────
let the_session = null;

const client = OPCUAClient.create({
    endpointMustExist: false,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    connectionStrategy: {
        maxRetry: 10,
        initialDelay: 1000,
        maxDelay: 10000
    }
});

async function connectOPCUA() {
    try {
        log("CONN", `Conectando a ${endpointUrl} ...`);
        await client.connect(endpointUrl);
        log("CONN", "Conexión TCP establecida.");
        the_session = await client.createSession();
        log("OK", `Sesión OPC UA creada.  SessionId: ${the_session.sessionId.toString()}`);
    } catch (err) {
        log("ERROR", `No se pudo conectar: ${err.message}`);
        log("WARN", "Reintentando en 5 s ...");
        setTimeout(connectOPCUA, 5000);
    }
}

connectOPCUA();

// ─── Helper: escribir un nodo con log completo ─────────────────────────────────
async function writeNode(nodeId, dataType, value) {
    writeCounter++;
    const writeId = writeCounter;

    logWriteStart(writeId, nodeId, dataType, value);

    const t0 = Date.now();

    const writeResult = await the_session.write({
        nodeId,
        attributeId: AttributeIds.Value,
        value: { value: { dataType, value } }
    });

    const elapsed = Date.now() - t0;
    const ok = writeResult.name === "Good";

    logWriteResult(writeId, nodeId, writeResult.name, elapsed, ok);

    return { variable: nodeId, status: writeResult.name, latencyMs: elapsed, ok };
}

// ─── POST /api/vfd/write ───────────────────────────────────────────────────────
app.post('/api/vfd/write', async (req, res) => {
    if (!the_session) {
        log("ERROR", "Petición recibida pero la sesión OPC UA no está activa.");
        return res.status(503).json({ error: "OPC UA session is not active" });
    }

    const { frequency, command } = req.body;
    log("INFO", `Petición /api/vfd/write  →  body: ${JSON.stringify(req.body)}`);

    try {
        const results = [];

        if (frequency !== undefined) {
            const result = await writeNode(
                "ns=1;s=FrequencySetpointHz",
                DataType.Double,
                parseFloat(frequency)
            );
            results.push(result);
        }

        if (command !== undefined) {
            const result = await writeNode(
                "ns=1;s=MotorCommand",
                DataType.UInt16,
                parseInt(command, 10)
            );
            results.push(result);
        }

        res.json({ success: true, results });

    } catch (err) {
        logWriteError(writeCounter + 1, "desconocido", err);
        log("ERROR", err.message);
        res.status(500).json({ error: err.message });
    }
});

// ─── GET /api/vfd/status ───────────────────────────────────────────────────────
app.get('/api/vfd/status', async (req, res) => {
    if (!the_session) {
        return res.status(503).json({ error: "OPC UA session is not active" });
    }

    try {
        const nodesToRead = [
            { nodeId: "ns=1;s=FrequencySetpointHz", attributeId: AttributeIds.Value },
            { nodeId: "ns=1;s=MotorCommand",        attributeId: AttributeIds.Value },
            { nodeId: "ns=1;s=RequestedState",      attributeId: AttributeIds.Value }
        ];

        const dataValues = await the_session.read(nodesToRead);

        res.json({
            frequency: dataValues[0].value.value,
            command:   dataValues[1].value.value,
            state:     dataValues[2].value.value
        });
    } catch (err) {
        log("ERROR", `Error leyendo estado: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
});

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(port, () => {
    log("INFO", `Backend escuchando en http://localhost:${port}`);
});
