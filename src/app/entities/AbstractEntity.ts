import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
export class AbstractEntity extends BaseEntity {
    @CreateDateColumn()
    public createdAt?: Date;
    @UpdateDateColumn()
    public updatedAt?: Date;
    @DeleteDateColumn()
    public deletedAt?: Date;
}