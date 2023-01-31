import{Column,Entity,ManyToOne,PrimaryGenaratedColumn}from "typeorm";
import { Csavar } from "./csavar.entity";
@Entity()
export class Rendeles{
    @PrimaryGenaratedColumn()
    id:number;
    @ManyToOne(()=>Csavar,(csavar)=>csavar.id)
    csavar_id:number
    @Column('int')
    db:number
}