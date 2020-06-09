import { Component, OnInit } from '@angular/core';
import { HeroesService } from './../../service/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  loading: boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.heroesService.getHeroes().subscribe(resp => {
      this.heroes = resp;
      this.loading = false;
    });
  }

  removeHeroe(heroe: HeroeModel, i: number) {

    Swal.fire({
      title: 'Are you sure?',
      text:'The selected hero will be deleted',
      icon:'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if(resp.value){
        this.heroes.splice(i, 1);
        this.heroesService.deleteHeroe(heroe.id).subscribe()
      }  
    })

  }

}
