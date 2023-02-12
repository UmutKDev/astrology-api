import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AstrologyDataRequest } from 'dto/astrology.dto';
import {
  AstrologyDateDataResponse,
  AstrologyFeatureDataResponse,
} from 'interfaces/astrology.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return {
      message: 'Hello World!',
    };
  }

  @Get('/astroloji')
  async getAstrology(
    @Query() { sign, type, date, feature }: AstrologyDataRequest,
  ): Promise<AstrologyDateDataResponse | AstrologyFeatureDataResponse> {
    if (type === 'date') {
      return await this.appService.getHoroscopeByDate({ sign, date });
    } else if (type === 'feature') {
      return await this.appService.getHoroscopeByFeature({
        sign,
        feature,
      });
    }
  }
}
