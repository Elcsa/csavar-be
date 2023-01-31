import { Body, Controller, Get,Param, Post, Render,Delete } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {isUndefined} from 'util;'
import { AppService } from './app.service';
import { Csavar } from './csavar.entity';
import { Rendeles } from './rendeles.entity';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get('/csavar')
  async getCsavarok(){
    const repo=this.dataSource.getRepo(Csavar)
    const rows=await repo.find()
    return{csavarok:rows}
  }
  @Post('/csavar')
  createnewCsavar(@Body()csavar:Csavar){
    let error="";
    csavar.id=undefined
    if(csavar.tipus== undefined || csavar.tipus.trim()==""){
      error="A csavar tipusanak megadasa kotelezo"
      return error
    }
    if(csavar.hosz<=0 || isNaN(csavar.hosz)){
      error="a csavar hoszanak megadasa kotelzo"
      return error
    }
    if(isNaN(csavar.keszlet)||csavar.keszlet<0){
      error="a csavar keszlet megadasa kotlezo"
      return error
    }
    if(csavar.ar<=0||isNaN(csavar.hosz)){
      error="a csavar aranak megadasa kotelo"
      return error
    }
    const repo=this.dataSource.getRepo(Csavar)
    repo.save(csavar)
  }
  @Delete('/csavar/:id')
  async deleteCsavar(@Param('id')id:number){
    const repo=this.dataSource.getRepo(Csavar)
    await repo.delete(id)
  }
  @Post('/csavar/:id/rendeles')
  async csavarRendeles(@Param('id')id:number,@Body()rendeles:Rendeles){
const repoRendeles=this.dataSource.getRepo(Rendeles)
const repoCsavar=this.dataSource.getRepo(Csavar)
let csavarkeszlet=(await repoCsavar.findOnBy({id:id})).keszlet
if(csavarkeszlet-rendeles.db<0){
  return{error:"nincs eleg csavar"}
}else{
  repoCsavar.update({id:id},{keszlet:csavarkeszlet-rendeles.db})
  let keszrendeles:Rendeles={id:undefined,csavar_id:id,db:rendeles.db}
  repoRendeles.save(keszrendeles)
  return{oszertek:rendeles.db*(await repoCsavar.findOnBy({id:id})).ar}
}
  }

}
