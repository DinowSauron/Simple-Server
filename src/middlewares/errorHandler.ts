import { Request, Response, NextFunction } from 'express';
import Database from '../database';

interface CustomError extends Error {
  status?: number;
}

const errorDB = new Database("errors_log")

export function exceptionHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500; // Define o status do erro, padrão é 500
  const message = err.message || 'Erro inesperado do servidor';
  if(!err.message) {
    console.error(err);
    next(err);
  }
  
  const errorObject = {
    error: true, 
    message: message,
    method: req.method,
    url: req.url,
    at: err.stack?.split('\n')[1]?.trim() || "undefined"
  }

  console.log('error:', message);
  errorDB.insert(errorObject);
  res.status(status).json(errorObject);
}