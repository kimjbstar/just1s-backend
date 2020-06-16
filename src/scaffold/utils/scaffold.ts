import { IScaffoldInput, TEMPLATE_TYPES, IMetadata } from "./constants";
import { HandlebarHelpers } from "./handlebar";
import * as path from "path";
import * as fs from "fs";
import * as Handlebars from "handlebars";
import { loadTemplate, parseInput } from "./utils";

export const scaffold = async (input: IScaffoldInput) => {
  for (let [key, value] of Object.entries(HandlebarHelpers)) {
    Handlebars.registerHelper(key, value);
  }

  const templates = {};
  for (const templateType of TEMPLATE_TYPES) {
    templates[templateType.key] = await loadTemplate(
      path.join(__dirname, `../templates/${templateType.key}.template`)
    );
  }

  const metadata: IMetadata = parseInput(input);
  metadata.isSub = false;
  metadata.hasManyEntities = [];

  const subMetadatas: IMetadata[] = [];
  if (input.subEntities?.length > 0) {
    input.subEntities.forEach((subModel) => {
      const originalName = subModel.name;
      subModel.name = [input.name, subModel.name].join("_");

      const subMetadata = parseInput(subModel);
      subMetadata.isSub = true;
      subMetadata.originalName = originalName;

      subMetadata.belongsToEntityNames = [metadata.name];
      subMetadatas.push(subMetadata);

      metadata.hasManyEntities.push(subMetadata);
    });
  }

  // console.dir(metadata, { depth: 3 });

  const codes = {};
  for (const templateType of TEMPLATE_TYPES) {
    console.log("complie " + templateType.key + "...");
    // console.log(metadata);
    try {
      codes[templateType.key] = Handlebars.compile(templates[templateType.key])(
        metadata
      );
    } catch (e) {
      console.log(e);
      process.exit(1);
    }

    const dirs = templateType.getDirectory(metadata.name);
    const fileName = templateType.getFileName(metadata.name);
    const fullPath = path.join(process.cwd(), dirs, fileName);
    console.log(fullPath);
    console.log(codes[templateType.key]);

    // await fs.mkdirSync(
    //   path.join(process.cwd(), templateType.getDirectory(metadata.name)),
    //   { recursive: true }
    // );
    // await fs.writeFileSync(fullPath, codes[templateType.key]);
  }

  if (subMetadatas.length > 0) {
    subMetadatas.forEach(async (subMetadata) => {
      for (const templateType of TEMPLATE_TYPES) {
        if (!templateType.sub) {
          continue;
        }
        console.log("sub complie " + templateType.key + "...");
        codes[templateType.key] = Handlebars.compile(
          templates[templateType.key]
        )(subMetadata);

        const dirs = templateType.getDirectory(subMetadata.name);
        const fileName = templateType.getFileName(subMetadata.name);
        const fullPath = path.join(process.cwd(), dirs, fileName);
        console.log(fullPath);
        console.log(codes[templateType.key]);

        // await fs.mkdirSync(
        //   path.join(process.cwd(), templateType.getDirectory(metadata.name)),
        //   { recursive: true }
        // );
        // await fs.writeFileSync(fullPath, codes[templateType.key]);
      }
    });
  }
};
