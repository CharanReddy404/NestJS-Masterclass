import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersoParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param authService
   */
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // check if user exists with same email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle execption
    // Create user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }

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
