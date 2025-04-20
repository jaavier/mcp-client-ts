import readline from "readline/promises";
import { MCPClient } from "./index.js";

export class Chat {
  private mcp: MCPClient;

  constructor(mcp: MCPClient) {
    this.mcp = mcp;
  }
  async loop() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");

      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.mcp.processQuery(message);
        console.log("\n" + response);
      }
    } finally {
      rl.close();
    }
  }
}

