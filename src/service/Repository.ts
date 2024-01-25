
import { Entity } from "@model/model/Entity";
import { Page } from "ba-model/src/api/page";
import { Mongoose, Model, Query, FilterQuery, Connection } from "mongoose";

export abstract class Repository<T extends Entity> {
  protected readonly db: Connection;
  abstract model: Model<T>;

  constructor(db: Connection) {
    this.db = db;
  }

  /**
   * 全列表查询
   * @param query 查询
   * @returns 满足条件的全部数据
   */
  async listAll(query: FilterQuery<T>): Promise<T[]> {
    return await this.model
      .find(query)
      .exec();
  }

  /**
   * 分页查询
   * @param pageNum 当前页
   * @param pageSize 分页大小
   * @param query 查询
   * @returns 分页结果
   */
  async page(pageNum = 1, pageSize = 20, query: FilterQuery<T> = {}): Promise<Page<T>> {
    return await this.model
      .find(query)
      .page(pageNum, pageSize);
  }


  async findById<K = string>(id: K): Promise<T | null> {
    return await this.model
      .findById(id)
      .exec();
  }

  async deleteById<K = string>(id: K) {
    await this.model
      .findByIdAndDelete(id)
      .exec();
  }

  async insert(entity: T): Promise<T> {
    return (await new this.model(entity)
      .save())
      .toObject();
  }

  /**
   * 覆盖更新整个实体的所有字段
   * @param entity 实体
   * @returns 更新后的实体
   */
  async update(entity: T): Promise<T> {
    return (await this.model
      .findByIdAndUpdate(entity._id, {
        $set: entity
      }, { new: true })
      .exec())!;
  }

  /**
   * 覆盖实体的一部分字段，未提供的字段将会保留
   * @param entity 要更新的这部分字段，必须包含_id
   * @returns 更新后的实体
   */
  async patch(entity: Partial<T>): Promise<T> {
    return (await this.model
      .findByIdAndUpdate(entity._id, entity, { new: true })
      .exec())!;
  }

  async insertOrUpdate(entity: T): Promise<T> {
    if (entity._id) {
      return this.update(entity);
    } else {
      return this.insert(entity);
    }
  }
}