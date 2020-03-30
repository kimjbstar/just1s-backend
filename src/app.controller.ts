import { Review } from "./models/review.model";
import { Sequelize } from "sequelize-typescript";
import { Controller, Get } from "@nestjs/common";
import { ModelCtor, Model } from "sequelize/types";

@Controller()
export class AppController {
  constructor(private sequelize: Sequelize) {}
  @Get()
  async getHello() {
    const models: {
      [key: string]: ModelCtor<Model>;
    } = this.sequelize.models;

    // Object.values(models).forEach(async (model: ModelCtor<Model>) => {
    //   const desc: object = await model.describe();
    //   console.log(desc);
    // });

    return "hello2";
  }
}
