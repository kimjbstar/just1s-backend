import * as path from "path";
import * as fs from "fs";
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Get,
  Query
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { S3 } from "aws-sdk";
import { ApiTags, ApiBody, ApiProperty, ApiConsumes } from "@nestjs/swagger";

class FileUploadDto {
  @ApiProperty({ type: "string", format: "binary" })
  file: any;
}

export class FileUploadQuery {
  type: "s3" | "fake";
}
@ApiTags("files")
@Controller("files")
export class FilesController {
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "이미지를 업로드 합니다.",
    type: FileUploadDto
  })
  @Post("image")
  @UseInterceptors(FileInterceptor("image"))
  // @UseInterceptors(
  //   FileInterceptor("image", {
  //     storage: diskStorage({
  //       destination: "./files",
  //       filename: editFileName
  //     }),
  //     fileFilter: imageFileFilter
  //   })
  // )
  async uploadedFile(@UploadedFile() file, @Query() q: FileUploadQuery) {
    const fileName = getHashFileName(file);

    if (q.type === "fake") {
      return {
        url:
          "http://175.126.232.36/thumb/20200416/cf883fc9572d2f48a60c588f2e99595c.jpg=w800"
      };
    }

    // 열화 처리
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "ap-northeast-2"
    });

    const param: S3.PutObjectRequest = {
      Bucket: "nbase-image",
      Key: "image/" + fileName,
      ACL: "public-read",
      Body: file.buffer
      // ContentType: "image/png"
    };

    try {
      const stored = await s3.upload(param).promise();
      console.log(stored);
      // {
      //   ETag: '"2c8c9e3c131cedaf9b108de5d5a12ee0"',
      //   Location:
      //  'https://nbase-image.s3.ap-northeast-2.amazonaws.com/image/unnamed-3274.png',
      //   key: 'image/unnamed-3274.png',
      //   Key: 'image/unnamed-3274.png',
      //   Bucket: 'nbase-image'
      // }
      return {
        url: stored.Location
      };
    } catch (err) {
      console.log(err);
      return {
        error: true
      };
    }
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "복수의 이미지를 업로드 합니다.",
    type: FileUploadDto
  })
  @Post("image/multiple")
  @UseInterceptors(
    FilesInterceptor("image", 20, {
      // storage: diskStorage({
      //   destination: "./files",
      //   filename: editFileName
      // }),
      // fileFilter: imageFileFilter
    })
  )
  async uploadMultipleFiles(@UploadedFiles() files, @Query() q) {
    const response = [];
    console.log(files);
    if (files !== undefined) {
      files.forEach((file) => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename
        };
        response.push(fileReponse);
      });
    }

    return response;
  }
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error("Only image files are allowed!"), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = path.extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const getHashFileName = (file) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = path.extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  return `${name}-${randomName}${fileExtName}`;
};
