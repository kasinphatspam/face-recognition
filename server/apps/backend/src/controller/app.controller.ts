import { Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Response } from 'express';

@Controller()
export class AppController {
    @Get("status")
    public checkStatus(@Res() res: Response){
        return res.status(HttpStatus.OK).json({ message: "Server connected" })
    }
}
