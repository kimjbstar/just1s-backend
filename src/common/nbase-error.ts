export class NBaseError extends Error {
  statusCode: number;
  description: string;

  constructor(statusCode: number, message: string, description?: string) {
    super(message);
    this.name = "NBaseError";
    this.description = description;
    this.statusCode = statusCode;
  }

  toJSON = () => {
    return {
      statusCode: this.statusCode,
      message: this.message,
      description: this.description,
      name: this.name
    };
  };
}
