import {HttpErrors} from '@loopback/rest';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {User} from '../models/user.model';
import {UserService, UserProfile} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {PasswordHasher} from './hash.password.bcryptjs';
import {PasswordHasherBindings} from '../keys';
import {inject} from '@loopback/context';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const foundUser = await this.userRepository.get(credentials.apiKey);
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `User with apiKey ${credentials.apiKey} not found.`,
      );
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.id) userName = `${user.id}`;
    if (user.apiKey)
      userName = user.id
        ? `${userName} ${user.apiKey}`
        : `${user.apiKey}`;
    return {id: userName, name: userName};
  }
}
