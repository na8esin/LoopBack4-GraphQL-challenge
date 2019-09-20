import { repository } from "@loopback/repository";
import { validateCredentials } from "../services/validator";
import {
  post,
  param,
  get,
  requestBody,
  getModelSchemaRef,
  api
} from "@loopback/rest";
import { User, JWT } from "../models";
import { UserRepository } from "../repositories";
import { inject } from "@loopback/core";
import {
  authenticate,
  UserProfile,
  AuthenticationBindings,
  TokenService,
  UserService
} from "@loopback/authentication";
import {
  CredentialsRequestBody,
  UserProfileSchema
} from "./specs/user-controller.specs";
import { Credentials } from "../repositories/user.repository";
import { PasswordHasher } from "../services/hash.password.bcryptjs";

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings
} from "../keys";
import * as _ from "lodash";

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>
  ) {}

  @post("/users", {
    tags: ["user"],
    summary: "Userを新規登録する",
    responses: {
      "200": {
        description: "Create User",
        content: { "application/json": { schema: getModelSchemaRef(User) } }
      }
    }
  })
  async create(@requestBody() user: User): Promise<User> {
    try {
      // create the new user
      await this.userRepository.set(user.apiKey, user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @get("/users/{userId}", {
    tags: ["user"],
    responses: {
      "200": {
        description: "User",
        content: {
          "application/json": { schema: getModelSchemaRef(User) }
        }
      }
    }
  })
  async findById(@param.path.string("userId") userId: string): Promise<User> {
    return new User();
  }

  @get("/users/me", {
    tags: ["user"],
    summary: "自分のUser情報を取得する",
    security: [{ bearerAuth: [] }],
    responses: {
      "200": {
        description: "The current user profile",
        content: {
          "application/json": {
            schema: UserProfileSchema
          }
        }
      }
    }
  })
  @authenticate("jwt")
  async printCurrentUser(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUserProfile: UserProfile
  ): Promise<UserProfile> {
    return currentUserProfile;
  }

  @post("/users/login", {
    tags: ["user"],
    summary: "apiKeyで認証してjwtを取得します",
    responses: {
      "200": {
        description: "Token",
        content: { "application/json": { schema: getModelSchemaRef(JWT) } }
      }
    }
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials
  ): Promise<JWT> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    const jwt = new JWT({ jwt: token });
    return jwt;
  }
}
