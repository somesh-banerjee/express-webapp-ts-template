import MetadataKeys from "../../utils/metadata.keys.js";

const Controller =
  (basePath: string): ClassDecorator =>
  (target) =>
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);

export default Controller;