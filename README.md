# MCP Claude Client

This project provides a command-line interface (CLI) client to interact with Anthropic's Claude models using the Model Context Protocol (MCP). Its primary purpose is to enable seamless execution of MCP tools without requiring manual confirmation for each tool call, offering more flexibility compared to interfaces like Claude Desktop.

## Prerequisites

*   Node.js (v18 or later recommended)
*   npm (usually comes with Node.js)
*   An Anthropic API Key
*   An MCP-compatible tool server (e.g., `mcp-filesystem-server` from this repository).

## Setup

1.  **Navigate to the Client Directory:**
    ```bash
    cd mcp-client-ts
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `clients/claude` directory:
    ```
    ANTHROPIC_API_KEY=your_anthropic_api_key_here
    # Optional: Specify a different Claude model
    # ANTHROPIC_MODEL=claude-3-opus-20240229
    # Optional: Set max tokens for responses
    # MAX_TOKENS=2048
    ```
    Replace `your_anthropic_api_key_here` with your actual Anthropic API key.

4.  **Build the Client:**
    Compile the TypeScript code to JavaScript:
    ```bash
    npm run build
    ```
    This will create a `build` directory containing the compiled JavaScript files.

## Running the Client

To run the client, you need to provide the path to the main script of your running MCP tool server.

```bash
node build/index.js <path_to_mcp_server_script>
```

**Example:**

If your MCP tool server's entry point is `../mcp-filesystem-server/dist/index.js` (relative to the `mcp-client-ts` directory), you would run:

```bash
node build/index.js ../mcp-filesystem-server/dist/index.js
```

Or if the server is a Python script:

```bash
node build/index.js ../mcp-weather-server/main.py
```

The client will connect to the specified MCP server, list the available tools, and present you with a chat prompt. You can then interact with Claude, and any tool calls requested by the model will be executed automatically via the connected MCP server.

## How it Works

1.  The client starts and establishes a connection with the specified MCP server using standard I/O (stdio).
2.  It retrieves the list of available tools from the MCP server.
3.  These tools are provided to the Anthropic API when sending messages.
4.  When Claude decides to use a tool, it sends a `tool_use` request.
5.  The client intercepts this request, calls the corresponding tool on the MCP server with the provided arguments.
6.  The result from the MCP server is sent back to Claude as user input to continue the conversation.

This process allows for automated tool execution based on Claude's reasoning, without intermediate user approval steps.
