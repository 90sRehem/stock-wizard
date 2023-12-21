import {
  CreateAccessTokenDTO,
  FindOneAccessTokenDTO,
  DeleteAccessTokenDTO,
  FindAccessTokenByUserIdDTO,
  FindAccessTokenById,
} from '../dtos';
import { AccessToken } from '../entities/access-token.entity';

export abstract class AccessTokenRepository {
  abstract create(data: CreateAccessTokenDTO): Promise<AccessToken>;
  abstract findOne(data: FindOneAccessTokenDTO): Promise<AccessToken | null>;
  abstract delete(data: DeleteAccessTokenDTO): Promise<void>;
  abstract findByUserId(
    data: FindAccessTokenByUserIdDTO,
  ): Promise<AccessToken | null>;
  abstract findById(data: FindAccessTokenById): Promise<AccessToken | null>;
}
