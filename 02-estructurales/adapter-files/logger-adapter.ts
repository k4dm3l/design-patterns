import { Logger } from 'jsr:@deno-library/logger';

// TODO: Implementar el LoggerAdapter
interface ILoggerAdapter {
  file: string;
  writeLog: (msg: string) => void;
  writeWarning: (msg: string) => void
  writeError: (msg: string) => void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;
  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    this.logger.info(`[${this.file} log] ${msg}`);
  };
  
  writeWarning(msg: string): void {
    this.logger.warn(`[${this.file} error] ${msg}`);
  };
  
  writeError(msg: string): void {
    this.logger.error(`[${this.file} warning] ${msg}`);
  };
  
}