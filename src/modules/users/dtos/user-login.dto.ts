// import { User } from '@src/common/users/entities/user.entity';
// import { InputType, Field, ArgsType } from 'type-graphql';
// import { IsNotEmpty, Length } from 'class-validator';
// import { F9BaseDto } from '@src/f9-base/types/f9-base-dto';

// @ArgsType()
// @InputType()
// export class UserLoginDto extends F9BaseDto {
//   @Field({
//     nullable: true,
//   })
//   appId?: number;

//   @Field()
//   @IsNotEmpty({ message: 'ID를 입력해주세요.' })
//   @Length(6, 20, {
//     message: 'ID는 6~20자로 입력해주세요.',
//   })
//   stringId: string;

//   @Field()
//   @IsNotEmpty()
//   @Length(4, 32, {
//     message: '비밀번호는 4~32자로 입력 가능합니다.',
//   })
//   pw: string;
// }
