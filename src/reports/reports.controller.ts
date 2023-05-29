import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { CreateReportDTO } from './dtos/create-report.dto';
import { getEstimateDTO } from './dtos/get-estimate.dto';
import { ReportDTO } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @Serialize(ReportDTO)
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    return this.reportsService.changeApproval(parseInt(id), body.approved);
  }

  @Get()
  getEstimate(@Query() query: getEstimateDTO) {
    return this.reportsService.createEstimate(query);
  }
}
