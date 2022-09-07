import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { TopPage, TopPageDocument } from './schemas/top-page.schema';

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPage.name) private readonly topPage: Model<TopPageDocument>) {}

  async create(createTopPageDto: CreateTopPageDto): Promise<TopPageDocument> {
    const topPage = new this.topPage(createTopPageDto);
    return topPage.save();
  }

  async findById(id: string): Promise<TopPageDocument | null> {
    return this.topPage.findById(id).exec();
  }

  async findByAlias(alias: string): Promise<TopPageDocument | null> {
    return this.topPage.findOne({ alias }).exec();
  }

  async deleteById(id: string): Promise<TopPageDocument | null> {
    return this.topPage.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    updateTopPageDto: UpdateTopPageDto,
  ): Promise<TopPageDocument | null> {
    return this.topPage.findByIdAndUpdate(id, updateTopPageDto, { new: true });
  }

  async findByFirstCategory({ firstCategory }: FindTopPageDto): Promise<TopPageDocument[]> {
    return (
      this.topPage
        // old find
        // .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1, seoText: 1 })

        // with aggregate array
        // .aggregate([
        //   {
        //     $match: {
        //       firstCategory,
        //     },
        //   },
        //   {
        //     $group: {
        //       _id: { secondCategory: '$secondCategory' },
        //       pages: { $push: { alias: '$alias', title: '$title', seoText: '$seoText' } },
        //     },
        //   },
        // ])

        // second variant
        .aggregate()
        .match({ firstCategory })
        .group({
          _id: '$secondCategory',
          pages: { $push: { alias: '$alias', title: '$title', seoText: '$seoText' } },
        })
        .exec()
    );
  }

  async findByText(text: string): Promise<TopPageDocument[]> {
    return this.topPage.find({ $text: { $search: text, $caseSensitive: false } }).exec();
  }

  async findAll(limit: number): Promise<TopPageDocument[]> {
    return this.topPage
      .aggregate([
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: limit,
        },
      ])
      .exec();
  }
}
