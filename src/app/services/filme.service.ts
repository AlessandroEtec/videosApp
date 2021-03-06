import { ToastController } from '@ionic/angular';
import { IListaFilmes } from './../models/IFilmeAPI.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    const url = `${this.apiURL}search/movie${this.key}&language=${this.lingua}&region=${this.regiao}&query=${busca}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  listarPopular(){
    //https://api.themoviedb.org/3/discover/movie?api_key=faaead9cd5fe0ff7b07632e4675a571d
    const url = `${this.apiURL}discover/movie${this.key}&language=${this.lingua}&region=${this.regiao}`;
    console.log(url);

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
