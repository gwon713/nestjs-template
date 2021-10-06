import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import {
  UpdateUserDto,
  UserDetailDto,
  UserDto,
  UserProviderDto,
  UserTokenDto,
} from '../user.dto';

@Injectable()
export class FbUserToUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type != 'body') {
      return value;
    }

    //
    // 객체가 firebase 인증 raw data 라면
    // 서버 user dto 형태로 바꾼다.
    //
    if (value.uid && value.email) {
      const user: UserDetailDto = {
        USER: {
          status: 'valid',
          userId: value.uid,
          email: value.email,
          name: value.displayName,
          nickname: value.displayName,
          lastVisit: value.lastLoginAt,
          photoUrl: value.photoURL || undefined,
          providerId:
            value.providerId || value.providerData.providerId || undefined,
          phoneNumber:
            value.phoneNumber || value.providerData.phoneNumber || undefined,
        },
        // provider data가 필요 할까...
        // 필요 없을것 같긴 한데...
        'USER#PROVIDER': {
          status: 'valid',
          userId: value.uid,
          providerId: value.providerData[0].providerId,
          uid: value.providerData[0]['uid'],
          displayName: value.providerData[0]['displayName'],
          email: value.providerData[0]['email'],
          phoneNumber: value.providerData[0]['phoneNumber'],
          photoURL: value.providerData[0]['photoURL'],
        },
        'USER#TOKEN': {
          status: 'valid',
          userId: value.uid,
          refreshToken: value.stsTokenManager.refreshToken,
          accessToken: value.stsTokenManager.accessToken,
          expirationTime: value.stsTokenManager.expirationTime,
        },
      };

      return user;
    }

    return value;
  }
}
