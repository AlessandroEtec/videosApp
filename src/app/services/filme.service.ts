import { ToastController } from '@ionic/angular';
import { IListaFilmes } from './../models/IFilmeAPI.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, getError, catchError } from 'rxjs/operators';
import { IFilmeApi } from '../models/IFilmeAPI.model';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  lingua = 'pt-BR';
  regiao = 'BR'
  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=faaead9cd5fe0ff7b07632e4675a571d';

  constructor(private http: HttpClient, private toastController: ToastController) { }

  buscarFilmes(busca: string): Observable<IListaFilmes> {
    const url = `${this.apiURL}search/movie${this.key}&language${this.lingua}&region=${this.regiao}&query=${busca}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    }
    );
    return null;
  }
}
