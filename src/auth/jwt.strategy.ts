/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"; // Strategy
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

// internally execute when Authguard() needed
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
      super({
        secretOrKey: 'Secret1234', // 1
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 2
      })
  }
  
  
  /*  
      The validate method of your JwtStrategy will only be called 
      when the token has been verified in terms of the encryption 
      (corrrect key was used to sign it, in your case secretKey) and it is not expired. 
      Only after those two things have been checked, validate is called with the payload. 
      With it, you can then e.g. check if the user still exists. So the three steps are:
 
      1. Token was signed with your secret key
      2. Token is not expired
      3. Custom payload validation
  */
  async validate(payload) {
      console.log(payload);
      const { username } = payload;
      const user: User = await this.userRepository.findOne({ username });

      if( !user ) {
          throw new UnauthorizedException();
      }

      return user; // return user 안할 시, 401 에러발생. 어딘가에서 체크를 함.
  }
}