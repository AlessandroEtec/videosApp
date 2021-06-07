import { SerieService } from './../services/serie.service';
import { IListaSeries, ISerieAPI } from './../models/ISerieAPI.model';
import { GeneroService } from './../services/genero.service';
import { FilmeService } from './../services/filme.service';
import { DadosService } from './../services/dados.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  listaSeries: IListaSeries;
  generos: string[] = [];
  titulo: "Séries";

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public serieService: SerieService,
    public generoService: GeneroService,
    public route: Router
  ) { }

  ngOnInit() {
     this.generoService.buscarGeneros().subscribe(
      (dados) => {
        console.log("Generos: ", dados.genres);
        dados.genres.forEach(genero => {
          this.generos[genero.id] = genero.name;
        });
      }
    );
    this.dadosService.guardarDados('generos', this.generos);
    this.listar();
  }

  filtrar(evento) {
    const busca = evento.target.value;
    if (busca && busca.trim() != "") {
      this.serieService.buscarSeries(busca).subscribe(
        dados => {
          console.log(dados);
          this.listaSeries = dados;
        }
      );
    }
  }
  listar() {
    this.serieService.listarPopular().subscribe(
      dados => {
        console.log(dados);
        this.listaSeries = dados;
      }
    );
  }

  exibirSerie(filme:ISerieAPI) {
    this.dadosService.guardarDados('serie', filme);
    this.route.navigateByUrl('dados-serie');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja Realmente favoritar a série?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Sim, Favoritar',
          handler: () => {
            this.apresentarToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Série adicionada aos favoritos.',
      duration: 2000,
      color: 'primary',
      position: 'top'
    });
    toast.present();
  }
}
