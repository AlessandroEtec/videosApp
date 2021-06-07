import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IListaSeries } from './../models/ISerieAPI.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  lingua = 'pt-BR';
  regiao = 'BR'
  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=faaead9cd5fe0ff7b07632e4675a571d';

  constructor(
    private http: HttpClient,
    private toastController: ToastController
    ) { }

    buscarSeries(busca: string): Observable<IListaSeries> {
      const url = `${this.apiURL}search/tv${this.key}&language=${this.lingua}&region=${this.regiao}&query=${busca}`;
      console.log(url);
      return this.http.get<IListaSeries>(url).pipe(
        map(retorno => retorno),
        catchError(erro => this.exibirErro(erro))
      );
    }

    listarPopular(){
      const url = `${this.apiURL}tv/popular${this.key}&language=${this.lingua}&region=${this.regiao}`;
      console.log(url);
        return this.http.get<IListaSeries>(url).pipe(
        map(retorno => retorno),
        catchError(erro => this.exibirErro(erro))
      );
    }

    async exibirErro(erro) {
      const toast = await this.toastController.create({
        message: 'Erro ao consultar a Série',
        duration: 2000,
        color: 'danger',
        position: 'middle'
      }
      );
      return null;
    }

}
