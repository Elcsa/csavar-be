import {Column,Entity,OneToMany,PrimaryGenratedColumn}from "typeorm";
import{Rendeles}from "./rendelse.entity";
@Entity()
export class Csavar{
@PrimaryGenratedColumn()
id:number;
@Column()
tipus:string
@Column('int')
hosz:number
@Column()
keszlet:number
@Column( {type:'decimal',precision:30,scale:2,})
ar:number
@OneToMany(()=>Rendeles,(rendeles)=>rendeles.csavar_id)
rendelesek:Rendeles[]
}