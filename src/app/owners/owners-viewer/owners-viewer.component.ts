import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-owners-viewer',
  templateUrl: './owners-viewer.component.html',
  styleUrls: ['./owners-viewer.component.css']
})
export class OwnersViewerComponent implements OnInit {
  owners: any[];

  constructor(private http: Http) { }

  ngOnInit() {
    this.getOwners().then(owners => this.owners = owners);
  }

  getOwners(): Promise<any> {
    return this.http.get('http://localhost:61019/api/owners')
      .map(response => response.json()).toPromise();
  }

  deleteOwnerApi(id: number): Promise<any> {
    const url = `http://localhost:61019/api/owners/${id}`;
    return this.http.delete(url).map(res => res).toPromise();
  }

  deleteOwner(id: number) {
    // Cautam owner index in lista de owners
    const index = this.owners.findIndex(x => x.id === id);
    // Sterg owner dupa index
    this.owners.splice(index, 1);
    // Sterg si din tabela
    this.deleteOwnerApi(id).then(res => console.log('Stergere OK'));
  }

}
