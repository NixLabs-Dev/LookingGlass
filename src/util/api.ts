export type CommandAPIResponse = {
    output?: {
      command: string;
      hostname: string;
      rawCommandOutput: string;
    };
    error?: string;
    success: boolean;
    timestamp: string;
}