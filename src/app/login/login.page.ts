import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;
  constructor(
    public toastController: ToastController,
    private route: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.email === 'admin' && this.senha === 'admin') {
      this.exibirMensagem("Seja bem vindo!", 'success')
      this.route.navigateByUrl('/tabs/tab1');
    } else {
      this.exibirMensagem("ERRO, Usuário e/ou senha inválidos!", 'danger')
    }
  }

  async exibirMensagem(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: cor,
      position: 'middle'
    }
    );
    toast.present();
  }
}
