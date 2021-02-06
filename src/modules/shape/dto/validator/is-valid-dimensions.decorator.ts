import { BadRequestException } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as lodash from 'lodash';
import { ShapeTypes } from 'src/modules/shape/constants';

export function isValidDimensions(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isValidDimensions' })
export class MatchConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];

    switch (relatedValue) {
      case ShapeTypes.circle:
        validateShape(value, ['radius'], ShapeTypes.circle);
        break;
      case ShapeTypes.rectangle:
        validateShape(value, ['length', 'breadth'], ShapeTypes.rectangle);
        break;
      case ShapeTypes.square:
        validateShape(value, ['side'], ShapeTypes.square);
        break;
      case ShapeTypes.triangle:
        validateShape(value, ['length_a', 'length_b', 'length_c'], ShapeTypes.triangle);
      default:
        break;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [] = args.constraints;
    return `${args.property} has invalid dimensions`;
  }
}


const validateShape = (dimensions: any, dimensionsArr: Array<string>, shapeName: string) => {
  try {
    const objKeys = Object.keys(dimensions);

    // validate dimensions passed in object
    if (lodash.difference(objKeys, dimensionsArr).length > 0)
      throw new BadRequestException(`${shapeName} has invalid dimensions`);

    objKeys.forEach(item => {
      if (typeof dimensions[item] != 'number')
        throw new BadRequestException(`${shapeName} has invalid dimension values type(s)`);
    });
  }
  catch (e) {
    throw new BadRequestException(e);
  }
}
