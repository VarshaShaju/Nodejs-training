import { Entity, BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";

@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;        
        
        @Column({ nullable: false })
        public name: string;
        @Column({ nullable: false, default: 5 })
        public password: string;

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;        
        @Column({ nullable: false })
        public departmentId: string;
        @Column({ nullable: false, default: 5 })
        public experience: number;
        @Column({nullable: true})
        public role: string;
}


