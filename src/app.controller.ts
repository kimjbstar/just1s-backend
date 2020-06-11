import {
  Controller,
  Get,
  UseGuards,
  Req,
  Response,
  Request,
  Query
} from "@nestjs/common";
import { CurrentUser } from "./common/current-user.decorator";
import { ApiTags } from "@nestjs/swagger";
import * as puppeteer from "puppeteer";

@ApiTags("app")
@Controller()
export class AppController {
  constructor() {}
  @Get()
  async getHello(@Req() req: Request, @CurrentUser() currentUser) {
    return {
      app: "just1s",
      author: ["kimjbstar@gmail.com", "stnh2622@gmail.com"],
      url: "https://api.just1s.xyz",
      desc: "단1초 API 서버입니다."
    };
  }

  @Get("parse_youtube")
  async parse_youtube(@Query("url") url, @Response() res) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setExtraHTTPHeaders({
        "Accept-Charset": "utf-8",
        "Content-Type": "text/html; charset=utf-8"
      });
      await page.goto(url); // URL is given by the "user" (your client-side application)

      let bodyHTML = await page.evaluate(() => {
        const scripts = document.querySelectorAll("script");
        let scriptText = "";
        scripts.forEach((script) => {
          if (script.text.trim().startsWith('window["ytInitialData"]')) {
            scriptText = script.text;
          }
        });
        return scriptText;
      });
      let regex = new RegExp(/window\["ytInitialData"] = (.*}})/);

      const regexResult = bodyHTML.match(regex);
      const result = regexResult.length >= 2 ? regexResult[1] : "{}";
      const jsonResult = JSON.parse(result);

      const metadataRows =
        jsonResult.contents.twoColumnWatchNextResults.results.results
          .contents[1].videoSecondaryInfoRenderer.metadataRowContainer
          .metadataRowContainerRenderer.rows;
      let index = -1;
      const fuckKeyValues = metadataRows.reduce((result, row) => {
        if (row.metadataRowRenderer === undefined) {
          return result;
        }
        const key = row.metadataRowRenderer.title.simpleText.toLowerCase();
        if (key == "song") {
          result.push({});
          index++;
        }
        let value = "";
        value = row.metadataRowRenderer.contents[0].runs
          ? row.metadataRowRenderer.contents[0].runs[0].text
          : row.metadataRowRenderer.contents[0].simpleText;
        if (row.metadataRowRenderer.contents[0].runs) {
          result[index][key + "Link"] =
            "https://www.youtube.com" +
            row.metadataRowRenderer.contents[0].runs[0].navigationEndpoint
              .commandMetadata.webCommandMetadata.url;
        }

        result[index][key] = value;
        return result;
      }, []);
      res.json(fuckKeyValues);
      await browser.close();
    } catch (e) {
      res.json({});
    }
  }
}
