/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"; // Strategy
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
      super({
        secretOrKey: 'Secret1234',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      })
  }
  
  
  /* The validate method of your JwtStrategy will only be called when the token has been verified in terms of the encryption (corrrect key was used to sign it, in your case secretKey) and it is not expired. Only after those two things have been checked, validate is called with the payload. With it, you can then e.g. check if the user still exists. So the three steps are:

Token was signed with your secret key
Token is not expired
Custom payload validation
You  */
  async validate(payload) {
      console.log("############");
      const { username } = payload;
      const user: User = await this.userRepository.findOne({ username });

      if( !user ) {
          throw new UnauthorizedException();
      }

      return user;
  }
}