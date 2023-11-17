import { User } from '@/entity';
import { Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { applicationDefault, initializeApp } from 'firebase-admin/app';

@Injectable()
export class NotificationFCMService {}
