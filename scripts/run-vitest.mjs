import { spawn } from "node:child_process";

const env = { ...process.env };

if (process.platform !== "win32") {
  env.TMPDIR = "/tmp";
  env.TMP = "/tmp";
  env.TEMP = "/tmp";
}

const args = process.argv.slice(2);
const pnpmExecPath = process.env.npm_execpath;
const command = pnpmExecPath ? process.execPath : process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const commandArgs = pnpmExecPath ? [pnpmExecPath, "exec", "vitest", ...args] : ["exec", "vitest", ...args];

const child = spawn(command, commandArgs, {
  env,
  stdio: "inherit",
});

child.on("error", error => {
  console.error("Failed to start Vitest:", error);
  process.exit(1);
});

child.on("exit", code => {
  process.exit(code ?? 1);
});
