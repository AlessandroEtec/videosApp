import { IFilme } from '../models/IFilme.model';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titulo = 'Vídeos App';
  listaVideos: IFilme[] = [
    {
      nome: 'Tom & Jerry',
      lancamento:'11/02/2021',
      duracao: '1h 41m',
      classificacao: 73,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9NvYyM8H6d5KAVGqpyFV9YPO5cU.jpg',
      generos:['Comédia', 'Família', 'Animação']
    },
    {
      nome: 'Liga da Justiça de Zack Snyder (2021)',
      lancamento:'18/03/2021',
      duracao: '4h 2m',
      classificacao: 85,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ArWn6gCi61b3b3hclD2L0LOk66k.jpg',
      generos:['Ação', 'Aventura', 'Fantasia', 'Ficção científica']
    },
    {
      nome: 'The Pink Panther (1993)',
      lancamento:'31/01/2003',
      duracao: '22m',
      classificacao: 67,
      cartaz: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eDDb0H7cimdNSXCIW2aKQQXrPzC.jpg',
      generos:['Animação', 'Comédia']
    }
  ];

  constructor(public alertController: AlertController, public toastController: ToastController) { }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja Realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
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
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'primary',
      position: 'top'
    });
    toast.present();
  }
}
