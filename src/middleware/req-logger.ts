


//% GETTING COUNTRY BY REQUEST IP.

//% READ THE DOCUMENTATION: * https://country.is/

import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import fs from 'node:fs'

//prettier-ignore
export const reqLogger = async(req: Request, _res: Response, next: NextFunction)=>{


    //$  TEST_UNPARSED_IP is only available in test environment
    //$  Under tests, IP will be the Google IP (::ffff:8.8.8.8) to get a log that says "US"
    const unparsedIp = process.env.TEST_UNPARSED_IP || req.ip

    const ip = unparsedIp?.split('::ffff:')[1] || unparsedIp?.split('::')[1] || ''

    let response
    try{
        response = await axios.get<CountryApiResponse>('https://api.country.is/' + ip) //% READ THE DOCUMENTATION: * https://country.is/
    }catch(e){
        console.log('Unable to get country',);
        const log = `${ new Date().toLocaleString()} - Unable to get country - ${req.url}\n`
        fs.appendFileSync('request-log.txt', log)
        next(); return;
    }

    const country = response.data.country

    const log  = `${ new Date().toLocaleString()} - ${country} - ${req.url} - ${process.env.TEST_UNPARSED_IP ? 'TEST' : 'PROD'}`
    //$ Example log: 6/19/2025, 11:28:10 AM - US - /api/signin - TEST

    console.log(log);
    fs.appendFileSync('request-log.txt', log + '\n')
    next()
}