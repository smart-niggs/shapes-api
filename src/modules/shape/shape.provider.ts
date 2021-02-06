import { ShapeModel } from "./shape.model";
import { SHAPE_REPOSITORY } from "./constants";

export const ShapeProvider = [
  {
    provide: SHAPE_REPOSITORY,
    useValue: ShapeModel,
  },
];
