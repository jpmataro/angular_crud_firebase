import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../service/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.routeActive.snapshot.paramMap.get('id');

    if(id !== 'new') {
      this.heroesService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      })
    }
  }

  save(formHeroe: NgForm) {
    
    if(formHeroe.invalid) {
      return;
    }

    Swal.fire({
      title: 'Wait',
      text: 'Saving...',
      icon: 'info',
      allowOutsideClick: false
    })

    Swal.showLoading();

    let response: Observable<any>;

    if(this.heroe.id) {
      response = this.heroesService.updateHeroe(this.heroe);
    } else {
      response = this.heroesService.createHeroe(this.heroe);
    }

    response.subscribe(resp => {
      Swal.fire({
        title: this.heroe.name,
        text: 'It has been saved successfully',
        icon: 'success',
      })
    },(error => {
      Swal.fire({
        title: this.heroe.name,
        text: 'Not saved correctly',
        icon: 'error',
      })
    }))
  }

}
