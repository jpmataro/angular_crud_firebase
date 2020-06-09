import { HeroeModel } from './../models/heroe.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = "https://heroeapp-96679.firebaseio.com"

  constructor(private http: HttpClient) { }

  createHeroe(heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe)
          .pipe(
            map((resp: any) => {
              heroe.id = resp.name;
              return heroe;
            })
          );
  }

  updateHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    }

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
          .pipe(
            map(this.heroesObjToArray)
          )
  }

  getHeroe(id: string) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  private heroesObjToArray(heroesObj: object) {
    if(heroesObj === null) return [];

    const heroes: HeroeModel[] = []

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key]
      heroe.id = key;

      heroes.push(heroe)
    })

    return heroes;
  }
}
