import gracefulShutdown from "http-graceful-shutdown";
import app from "./app";
import { initIO } from "./libs/socket";
import { logger } from "./utils/logger";
import { StartAllWhatsAppsSessions } from "./services/WbotServices/StartAllWhatsAppsSessions";
import Company from "./models/Company";
import { startQueueProcess } from "./queues";
import { TransferTicketQueue } from "./wbotTransferTicketQueue";
import cron from "node-cron";

const server = app.listen(process.env.PORT, async () => {
  try {
    const companies = await Company.findAll();
    const sessionPromises = [];

    for (const c of companies) {
      sessionPromises.push(StartAllWhatsAppsSessions(c.id));
    }

    await Promise.all(sessionPromises);
    startQueueProcess();
    logger.info(`Server started on port: ${process.env.PORT}`);
  } catch (error) {
    logger.error("Error starting server:", error);
    // Exibe o erro completo no terminal
    try {
      console.error("[SERVER INIT ERROR]", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    } catch (e) {
      console.error("[SERVER INIT ERROR]", error);
    }
    process.exit(1);
  }
});


process.on("uncaughtException", err => {
  console.error(`${new Date().toUTCString()} uncaughtException:`);
  try {
    console.error(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
  } catch (e) {
    console.error(err);
  }
  process.exit(1);
});


process.on("unhandledRejection", (reason, p) => {
  console.error(`${new Date().toUTCString()} unhandledRejection:`);
  try {
    console.error('Reason:', JSON.stringify(reason, Object.getOwnPropertyNames(reason), 2));
  } catch (e) {
    console.error('Reason:', reason);
  }
  console.error('Promise:', p);
  process.exit(1);
});


cron.schedule("* * * * *", async () => {
  try {
    logger.info(`Serviço de transferência de tickets iniciado`);
    await TransferTicketQueue();
  } catch (error) {
    logger.error("Error in cron job:", error);
  }
});

initIO(server);

// Configure graceful shutdown to handle all outstanding promises
gracefulShutdown(server, {
  signals: "SIGINT SIGTERM",
  timeout: 30000, // 30 seconds
  onShutdown: async () => {
    logger.info("Gracefully shutting down...");
    // Add any other cleanup code here, if necessary
  },
  finally: () => {
    logger.info("Server shutdown complete.");
  }
});
