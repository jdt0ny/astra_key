export const TERMINAL_COMMANDS = ['help', 'about', 'connect', 'astra'] as const;

export type TerminalCommand = (typeof TERMINAL_COMMANDS)[number];

const commandSet: ReadonlySet<string> = new Set(TERMINAL_COMMANDS);

export function isTerminalCommand(value: string): value is TerminalCommand {
  return commandSet.has(value);
}
