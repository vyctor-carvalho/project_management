import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserExpertiseAreasService } from './user_expertise_areas.service';
import { CreateUserExpertiseAreaDto } from './dto/create-user_expertise_area.dto';
import { UpdateUserExpertiseAreaDto } from './dto/update-user_expertise_area.dto';

@Controller('user-expertise-areas')
export class UserExpertiseAreasController {
  constructor(private readonly userExpertiseAreasService: UserExpertiseAreasService) {}

  @Post()
  create(@Body() createUserExpertiseAreaDto: CreateUserExpertiseAreaDto) {
    return this.userExpertiseAreasService.create(createUserExpertiseAreaDto);
  }

  @Get()
  findAll() {
    return this.userExpertiseAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userExpertiseAreasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserExpertiseAreaDto: UpdateUserExpertiseAreaDto) {
    return this.userExpertiseAreasService.update(id, updateUserExpertiseAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userExpertiseAreasService.remove(id);
  }
}
