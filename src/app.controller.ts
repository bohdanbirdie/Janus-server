import { Get, Controller, HttpCode, Post, Body } from "@nestjs/common";

interface IChallenge {
  token: string;
  challenge: string;
  type: string;
}

@Controller()
export class AppController {
  @Get()
  root(): string {
    return "Hello World!";
  }

  @HttpCode(202)
  @Post()
  challenge(@Body() challenge: IChallenge) {
    console.log(challenge);
    return {
      challenge: challenge.challenge
    };
  }
}
