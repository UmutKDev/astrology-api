import { Injectable } from '@nestjs/common';
import {
  AstrologyDateDataResponse,
  AstrologyFeatureDataResponse,
  DateType,
} from 'interfaces/astrology.interface';
import axios from 'axios';
import * as cheerio from 'cheerio';

const API_URI_1 =
  'https://www.hurriyet.com.tr/mahmure/astroloji/{0}-burcu-{1}-yorum/'; // burada get değerine göre burcun haftalık,aylık,yıllık yorumunu alacağız
const API_URI_2 =
  'https://www.hurriyet.com.tr/mahmure/astroloji/burclar/{0}-burcu/{1}';

@Injectable()
export class AppService {
  async getHoroscopeByDate({ sign, date }): Promise<AstrologyDateDataResponse> {
    const data = await axios
      .get(
        API_URI_1.replace('{0}', sign).replace(
          date === DateType.Daily ? '-{1}-yorum' : '{1}',
          date === DateType.Daily ? '' : date,
        ),
      )
      .then((res) => res.data);
    const $ = cheerio.load(data);
    let response = {} as AstrologyDateDataResponse;

    $('div[class=main-wrapper]').each(function (i, e) {
      response = {
        sign:
          englishLetterToTurkishLetter(sign).charAt(0).toUpperCase() +
          englishLetterToTurkishLetter(sign).slice(1),
        date:
          englishLetterToTurkishLetter(date).charAt(0).toUpperCase() +
          englishLetterToTurkishLetter(date).slice(1),
        motto: $(this)
          .find(
            'div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ',
          )
          .slice(0)
          .eq(0)
          .text()
          .match(/(.*):\s\s(.*)/)[2],
        planet: $(this)
          .find(
            'div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ',
          )
          .slice(0)
          .eq(1)
          .text()
          .match(/(.*):\s\s(.*)/)[2],
        element: $(this)
          .find(
            'div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ',
          )
          .slice(0)
          .eq(2)
          .text()
          .match(/(.*):\s\s(.*)/)[2],
        comment: $(this)
          .find(
            'div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p',
          )
          .text(),
      };
    });

    return response;
  }

  async getHoroscopeByFeature({
    sign,
    feature,
  }): Promise<AstrologyFeatureDataResponse> {
    const data = await axios
      .get(API_URI_2.replace('{0}', sign).replace('{1}', feature))
      .then((res) => res.data);
    const $ = cheerio.load(data);
    let response = {} as AstrologyFeatureDataResponse;

    $('.col-md-12.col-lg-8').each(function (i, e) {
      response = {
        sign:
          englishLetterToTurkishLetter(sign).charAt(0).toUpperCase() +
          englishLetterToTurkishLetter(sign).slice(1),
        feature:
          englishLetterToTurkishLetter(feature).charAt(0).toUpperCase() +
          englishLetterToTurkishLetter(feature).slice(1),
        title: $(this)
          .find('div h2')
          .text()
          .match(/(.*)\"(.*)\.(.*)/)[2],
        comment: $(this).find('div div p').text(),
      };
    });

    return response;
  }
}

export function englishLetterToTurkishLetter(str: string) {
  return str
    .replace(/i/g, 'ı')
    .replace(/I/g, 'İ')
    .replace(/g/g, 'g')
    .replace(/G/g, 'Ğ')
    .replace(/c/g, 'ç')
    .replace(/C/g, 'Ç')
    .replace(/s/g, 'ş')
    .replace(/S/g, 'Ş')
    .replace(/O/g, 'Ö')
    .replace(/u/g, 'ü')
    .replace(/U/g, 'Ü');
}

export default AppService;
