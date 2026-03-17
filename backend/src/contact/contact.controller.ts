import { Controller, Post, Body, Get } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {

  constructor(private contactService: ContactService) {}

  @Post()
  create(@Body() body: any) {
    return this.contactService.create(body);
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }
}