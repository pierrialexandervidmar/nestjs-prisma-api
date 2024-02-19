import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repositories/posts.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostRepository) {}

  create(createPostDto: CreatePostDto) {
    return this.repository.create(createPostDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const post = await this.repository.findOne(id);

    if (!post) {
      throw new NotFoundError('Post não encontrado!');
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
