import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting UsersService
     */
    private readonly usersService: UsersService,
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      { user, title: 'post1', content: 'content1' },
      { user, title: 'post2', content: 'content2' },
    ];
  }
}
