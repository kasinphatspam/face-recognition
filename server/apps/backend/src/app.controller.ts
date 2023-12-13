import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('status')
  public checkStatus(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ message: 'Server connected' });
  }
}
