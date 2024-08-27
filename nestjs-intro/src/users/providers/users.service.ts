import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersoParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/provider/auth.service';

/**
 * Class to control users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param authService
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Find all users
   */
  public findAll(
    getUserParamDto: GetUsersoParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      { name: 'John', email: 'a@a.com' },
      { name: 'Jane', email: 'b@b.com' },
      { name: 'Jim', email: 'c@c.com' },
    ];
  }

  /**
   * Find a user by ID
   */
  public findOneById(id: string) {
    return { id: 1234, name: 'John', email: 'a@a.com' };
  }
}
