import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.scss']
})
export class OwnerCreateComponent implements OnInit {
  form: FormGroup;
  owner: any;
  ownerId: number;
  private routeSubscribe: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private http: Http, private router: Router) { }

  ngOnInit() {
    // Initializare model (identic cu raspunsul de la api)
    this.owner = {
      age: undefined,
      lastName: undefined,
      firstName: undefined
    };

    // Validare a formei
    this.form = this.formBuilder.group({
      age: [ '', !Validators.required ],
      lastName: [ '', !Validators.required ],
      firstName: [ null, !Validators.required ],
    });

    // Verific daca url-ul meu contine un parametru id (cel declarat in owners.module.ts pentru edit)
    this.routeSubscribe = this.route.params.subscribe(params => {
      this.ownerId = params[ 'id' ];
      // Daca am un id in url atunci vreau sa incarc forma cu datele primite de la server
      if (this.ownerId) {
        this.getOwnerById(this.ownerId).then(owner => this.owner = owner);
      }
    });
  }


  getOwnerById(id: number): Promise<any> {
    return this.http.get(`http://localhost:61019/api/owners/${id}`)
      .map(response => response.json()).toPromise();
  }

  createOwner(): Promise<any> {
    return this.http.post(`http://localhost:61019/api/owners`, this.owner)
      .map(response => response.json()).toPromise();
  }

  updateOwner(): Promise<any> {
    return this.http.put(`http://localhost:61019/api/owners/${this.owner.id}`, this.owner)
      .map(response => response.json()).toPromise();
  }
  
  saveOwner() {
    // Daca am un id in url inseamna ca sunt pe pagina de edit si vreau sa fac update
    if (this.ownerId) {
      this.updateOwner();
    } else {
      // Daca nu am un id inseamna ca sunt pe forma de create si vreau sa inserez un nou owner
      // Dupa inserare vreau sa fac redirect la pagina de edit a acelui owner
      this.createOwner().then(owner => {
        this.router.navigate([`owners/edit/${owner.id}`]);
      });
    }

  }

}
